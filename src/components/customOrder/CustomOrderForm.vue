<script lang="ts">
   import { defineComponent } from "vue";
   import { StructureOptions } from "@/types/CustomOrderType";
   import CustomToggleItems from "@/components/customOrder/CustomToggleItems.vue";
   import Button from "@/components/ui/button/Button.vue";

   export default defineComponent({
      name: "CustomOrderForm",
      components: {
         Button,
         CustomToggleItems,
      },
      data() {
         return {
            form: {
               structure: StructureOptions.PLATE,
               files: [] as File[],
               message: "",
            },
            filePreviews: [] as (string | null)[],
         };
      },
      computed: {
         isFormValid() {
            return (
               this.form.structure != undefined &&
               this.form.files.length &&
               this.form.message
            );
         },
      },
      methods: {
         updateStructure(newStructure: StructureOptions) {
            this.form.structure = newStructure;
         },
         submitForm() {
            console.log(this.form);
         },
         handleFileUpload(event: Event) {
            const target = event.target as HTMLInputElement;
            if (target.files) {
               const files = Array.from(target.files);
               this.form.files = files;
               this.filePreviews = files.map((file) => {
                  if (!file.type.startsWith("image/")) {
                     return null;
                  }
                  return URL.createObjectURL(file);
               });
            }
         },
      },
   });
</script>

<template>
   <form
      @submit.prevent="submitForm"
      class="flex flex-col gap-7 justify-center items-center mx-auto px-20 mt-12"
   >
      <CustomToggleItems
         :selected-structure="form.structure"
         @update-structure="updateStructure"
      />
      <input
         type="file"
         multiple
         accept="image/*"
         @change="handleFileUpload"
         class="w-[40rem] p-3 border border-gray-300 rounded-md"
      />
      <div v-if="filePreviews.length > 0" class="grid grid-cols-3 gap-4">
         <img
            v-for="preview in filePreviews"
            :src="preview ? preview : undefined"
            :key="preview ? preview : 'no-preview'"
            class="w-full h-32 object-cover rounded-md transition-all duration-300 ease-in-out hover:scale-105"
         />
      </div>
      <textarea
         v-model="form.message"
         placeholder="Write a message here..."
         class="w-[40rem] h-[10rem] p-3 border border-gray-300 rounded-md resize-none"
      ></textarea>
      <Button type="submit" class="">Submit</Button>
   </form>
</template>
