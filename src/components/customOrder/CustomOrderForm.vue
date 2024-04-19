<script lang="ts">
   import { defineComponent } from "vue";
   import { StructureName } from "@/types/CustomOrderType";
   import CustomToggleItems from "@/components/customOrder/CustomToggleItems.vue";
   import Button from "@/components/ui/button/Button.vue";
   import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
   import { useCustomOrderStore } from "@/stores/useCustomOrderStore";
   import type { CustomOrderForm } from "@/types/CustomOrderType";

   export default defineComponent({
      name: "CustomOrderForm",
      components: {
         Button,
         CustomToggleItems,
         FontAwesomeIcon,
      },
      computed: {
         customOrderStore() {
            return useCustomOrderStore();
         },
         form(): CustomOrderForm {
            return this.customOrderStore.form;
         },
         filePreviews(): string[] {
            if (this.customOrderStore.filePreviews.length === 0) return [];
            return this.customOrderStore.filePreviews.filter(
               (preview) => preview !== null
            );
         },
         showImgModal(): boolean {
            return this.customOrderStore.showImgModal;
         },
         imgModalSrc(): string | null {
            return this.customOrderStore.imgModalSrc;
         },
      },
      methods: {
         updateStructure(name: StructureName) {
            this.customOrderStore.updateForm("structure", name);
         },
         handleFileUpload(event: Event) {
            const target = event.target as HTMLInputElement;
            if (target.files) {
               const files = Array.from(target.files);
               this.customOrderStore.handleFileUpload(files);
            }
         },
         submitForm() {
            console.log(this.customOrderStore.form);
         },
         openModal(src: string) {
            this.customOrderStore.openModal(src);
         },
         closeModal() {
            this.customOrderStore.closeModal();
         },
      },
      watch: {
         form: {
            deep: true,
            handler() {
               console.log(this.customOrderStore.form);
            },
         },
      },
   });
</script>

<template>
   <form
      @submit.prevent="submitForm"
      class="flex flex-col gap-7 justify-center items-center mx-auto px-20 my-12"
   >
      <CustomToggleItems
         :selected-structure="form.structure"
         @update-structure="updateStructure"
      />
      <label
         for="file-upload"
         class="w-[40rem] h-[4rem] flex justify-center items-center p-3 border border-gray-300 rounded-md cursor-pointer text-white hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
         :class="filePreviews.length > 0 ? 'bg-green' : 'bg-black2'"
      >
         <div v-if="filePreviews.length > 0">
            <FontAwesomeIcon icon="circle-check" class="mr-2 text-white" />
            {{ filePreviews.length }} Image{{
               filePreviews.length != 1 ? "s" : ""
            }}
            Uploaded
         </div>
         <div v-else>
            <FontAwesomeIcon icon="upload" class="mr-2 text-white" /> Upload
            your images
         </div>
      </label>
      <input
         id="file-upload"
         type="file"
         multiple
         accept="image/*"
         @change="handleFileUpload"
         class="hidden"
      />
      <div v-if="filePreviews.length > 0" class="grid grid-cols-3 gap-4">
         <img
            v-for="preview in filePreviews"
            :src="preview"
            :key="preview"
            class="w-full h-32 object-cover cursor-pointer rounded-md transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
            @click="openModal(preview)"
         />
      </div>
      <div
         v-if="showImgModal && imgModalSrc"
         class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
         @click="closeModal"
      >
         <img
            :src="imgModalSrc"
            class="max-w-3xl max-h-[90vh] rounded-lg shadow-xl"
         />
      </div>
      <textarea
         v-model="form.message"
         placeholder="Write a message here..."
         class="w-[40rem] h-[10rem] p-3 rounded-md resize-none focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-opacity-50 focus-visible:ring-offset-2 transition-all duration-300 ease-in-out"
      ></textarea>
      <Button type="submit" class="">Submit</Button>
   </form>
</template>
