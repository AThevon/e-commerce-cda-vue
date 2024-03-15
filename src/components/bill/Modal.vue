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
   <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 grid place-items-center" @click="closeModal">
      <div class="relative flex flex-col justify-center items-center gap-4 p-8 bg-black2 rounded-10" @click.stop>
         <Button
            size="icon"
            variant="destructive"
            class="delete-btn"
            :onClick="closeModal"
            >X</Button
         >
         <h2 class="text-white font-bold text-1.5xl text-center mb-8" >Pick a template</h2>
         <div class="grid grid-cols-3 gap-4" v-if="billLineTemplates">
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