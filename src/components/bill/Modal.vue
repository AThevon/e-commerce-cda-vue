<script lang="ts">
   import { defineComponent } from "vue";
   import type { LineType } from "@/types/BillType";
   import Button from "../ui/button/Button.vue";

   export default defineComponent({
      components: { Button },
      props: ["billLineTemplates"],
      methods: {
         closeModal() {
            this.$emit("close-modal");
         },
         addLine(templateName: string) {
            this.$emit("add-line", templateName);
            this.closeModal();
         },
      },
      computed: {
         filterTemplates() {
            return this.billLineTemplates.filter(
               (template: LineType) => template.template_name !== "default"
            );
         },
      },
   });
</script>

<template>
   <div class="modal-container" @click="closeModal">
      <div class="modal" @click.stop>
         <Button
            size="icon"
            variant="destructive"
            class="delete-btn"
            :onClick="closeModal"
            >X</Button
         >
         <h2>Pick a template</h2>
         <div class="btn-container" v-if="billLineTemplates">
            <Button
               v-for="template in (filterTemplates as any)"
               :key="template.template_name"
               variant="secondary"
               @click="() => addLine(template.template_name)"
            >
               {{ template.template_name }}
            </Button>
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
   @import "@/css/variables.scss";
   .modal-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: grid;
      place-items: center;
      .modal {
         position: relative;
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         gap: 1rem;
         padding: 2rem;
         background-color: $black2;
         border-radius: 10px;
         h2 {
            color: $white;
            font-weight: 700;
            font-size: 1.5rem;
            text-align: center;
            margin-bottom: 2rem;
         }
         .btn-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
         }
         .delete-btn {
            position: absolute;
            top: 1rem;
            right: 2rem;
         }
      }
   }
</style>
