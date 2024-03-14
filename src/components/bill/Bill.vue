<script lang="ts">
   import BillLine from "@/components/bill/BillLine.vue";
   import Total from "@/components/bill/Total.vue";
   import Modal from "@/components/bill/Modal.vue";
   import type { LineType } from "@/types/BillType";
   import { EnumTVA } from "@/types/BillType";
   import { defineComponent } from "vue";
   import Button from "@/components/ui/button/Button.vue";
   import { toast } from "@/components/ui/toast/use-toast";
   import {
      AlertDialog,
      AlertDialogTrigger,
   } from "@/components/ui/alert-dialog";
   import AlertDialogBill from "./AlertDialogBill.vue";

   export default defineComponent({
      components: {
         BillLine,
         Total,
         Modal,
         Button,
         AlertDialog,
         AlertDialogBill,
         AlertDialogTrigger,
      },
      data() {
         return {
            isModal: false,
            lines: [
               {
                  id: 1,
                  name: "",
                  description: "",
                  unitPrice: 0,
                  quantity: 1,
                  tva: EnumTVA.TVA_20,
               },
            ] as LineType[],
            billLineTemplates: [] as LineType[],
         };
      },
      methods: {
         showModal() {
            this.isModal = true;
         },
         fetchBillLineTemplates() {
            fetch("/data/billLineTemplates.json")
               .then((response) => response.json())
               .then((data) => {
                  this.billLineTemplates = data;
               })
               .catch((error) =>
                  console.error("Error fetching the local json:", error)
               );
         },
         addLine(templateName: string) {
            if (this.billLineTemplates.length == 0) return;
            let newLine;
            if (!templateName) {
               newLine = this.billLineTemplates.find(
                  (template) => template.template_name === "default"
               );
            } else {
               newLine = this.billLineTemplates.find(
                  (template) => template.template_name === templateName
               );
            }
            if (newLine === undefined) return;
            this.lines.push({
               ...newLine,
               id: this.lines.length + 1,
            });
         },
         updateLine(index: number, updatedLine: LineType) {
            this.lines.splice(index, 1, updatedLine);
         },
         deleteLine(index: number) {
            if (this.lines.length <= 1) {
               toast({
                  description: "You cannot delete the last row !",
                  variant: "destructive",
               });
            } else {
               this.lines.splice(index, 1);
            }
         },
         deleteAllLines() {
            if (this.lines.length > 1) {
               let line = this.billLineTemplates.find(
                  (template) => template.template_name === "default"
               );
               if (line === undefined) return;
               this.lines.splice(0, this.lines.length, {
                  ...line,
                  id: 1,
               });
            }
         },
         toastLastRow() {
            toast({
               description: "You cannot delete the last row !",
               variant: "destructive",
            });
         },
      },
      computed: {
         totalHT() {
            return this.lines.reduce(
               (acc, line) => acc + line.unitPrice * line.quantity,
               0
            );
         },
         tva() {
            return this.lines.reduce(
               (acc, line) =>
                  acc + line.unitPrice * line.quantity * (line.tva / 100),
               0
            );
         },
      },
      mounted() {
         this.fetchBillLineTemplates();
      },
   });
</script>

<template>
   <div>
      <ul>
         <li>
            <span>Nom</span>
            <span>Description</span>
            <span>Prix</span>
            <span>Quantité</span>
            <span>TVA</span>
         </li>
         <BillLine
            v-for="(line, index) in lines"
            :key="line.id"
            :line="line"
            @update-line="updateLine(index, $event)"
            @delete-line="deleteLine(index)"
         ></BillLine>
      </ul>
      <div class="btn-wrapper">
         <Button @click="() => addLine('')">Add a row</Button>
         <Button @click="showModal">Add a template</Button>
         <Button
            v-if="lines.length <= 1"
            variant="destructive"
            @click="toastLastRow"
            >Delete all rows</Button
         >
         <AlertDialog v-else>
            <AlertDialogTrigger as-child>
               <Button variant="destructive">Delete all rows</Button>
            </AlertDialogTrigger>
            <AlertDialogBill :delete-all-lines="deleteAllLines" />
         </AlertDialog>
      </div>
      <Modal
         v-if="isModal"
         :bill-line-templates="billLineTemplates"
         @close-modal="isModal = false"
         @add-line="addLine"
      ></Modal>
      <Total :totalHT="totalHT" :tva="tva"></Total>
   </div>
</template>

<style scoped lang="scss">
   @import "@/css/variables.scss";

   ul {
      width: 75%;
      margin-inline: auto;
      display: grid;
      grid-template-columns: repeat(2, 1fr) repeat(2, 100px) 75px 150px;
      padding: 1rem;
      border: 1px solid $light-grey;
      border-radius: 8px;
      li {
         grid-column: span 6;
         width: 100%;
         text-align: center;
         font-weight: bold;
         padding: 1rem;
         margin-bottom: 1rem;
      }
      li:first-child {
         width: 100%;
         display: grid;
         gap: 0.5rem;
         grid-template-columns: repeat(2, 1fr) repeat(2, 100px) 75px 150px;
         border-radius: 8px;
      }
   }
   .btn-wrapper {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
   }
</style>
