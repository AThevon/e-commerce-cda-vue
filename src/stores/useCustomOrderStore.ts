import { defineStore } from "pinia";
import { StructureName, type StructureType } from "@/types/CustomOrderType";

export const useCustomOrderStore = defineStore("customOrder", {
   state: () => ({
      form: {
         structure: StructureName.PLATE,
         files: [] as File[],
         message: "",
      },
      structures: [] as StructureType[],
      filePreviews: [] as (string | null)[],
      showImgModal: false,
      imgModalSrc: null as string | null,
   }),
   getters: {
      isFormValid: (state) => {
         return (
            state.form.structure != null &&
            state.form.files.length > 0 &&
            state.form.message !== ""
         );
      },
   },
   actions: {
      async fetchStructures() {
         const response = await fetch("/data/structures.json")
            .then((res) => res.json())
            .catch((error) => {
               console.log(error);
            });
         this.structures = response;
      },
      updateForm(key: string, value: any) {
         this.form[key as keyof typeof this.form] = value;
      },
      openModal(src: string) {
         this.showImgModal = true;
         this.imgModalSrc = src;
      },
      closeModal() {
         this.showImgModal = false;
         this.imgModalSrc = null;
      },
      handleFileUpload(files: File[]) {
         this.form.files = files;
         this.filePreviews = files
            .map((file) => {
               return file.type.startsWith("image/")
                  ? URL.createObjectURL(file)
                  : null;
            })
            .filter((url) => url !== null);
      },
      clearForm() {
         this.form = {
            structure: StructureName.PLATE,
            files: [],
            message: "",
         };
         this.filePreviews = [];
         this.imgModalSrc = null;
         this.showImgModal = false;
      },
   },
});
