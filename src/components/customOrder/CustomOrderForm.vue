<script lang="ts">
   import { defineComponent } from "vue";
   import { StructureOptions } from "@/types/CustomOrderType";
   import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
   import Button from "@/components/ui/button/Button.vue";

   export default defineComponent({
      name: "CustomOrderForm",
      components: {
         Button,
         ToggleGroup,
         ToggleGroupItem,
      },
      data() {
        return {
            form: {
<<<<<<< HEAD
                structure: StructureOptions.PLATE,
                files: [] as File[],
                message: "",
=======
               structure: StructureOptions.PLATE,
               files: [] as File[],
               message: "",
>>>>>>> a86b6555e36310aaa872001c01273c2cfbb857f9
            },
            filePreviews: [] as (string | null)[],
            StructureOptions,
        };
    },
      computed: {
         isFormValid() {
            return this.form.structure && this.form.files.length && this.form.message;
         },
      },
      computed: {
         isFormValid() {
            return (
               this.form.structure &&
               this.form.files.length &&
               this.form.message
            );
         },
      },
      methods: {
         submitForm() {
            console.log(this.form);
         },
         handleFileUpload(event: Event) {
            const target = event.target as HTMLInputElement;
            if (target.files) {
<<<<<<< HEAD
                const files = Array.from(target.files);
                this.form.files = files;
                this.filePreviews = files.map(file => {
                    if (!file.type.startsWith('image/')) { return null; }
                    return URL.createObjectURL(file);
                });
            }
        },
=======
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
>>>>>>> a86b6555e36310aaa872001c01273c2cfbb857f9
      },
      watch: {
         form: {
            deep: true,
            handler() {
               this.form.structure =
                  this.form.structure || StructureOptions.PLATE;
            },
         },
      },
   });
</script>

<template>
   <form
      @submit.prevent="submitForm"
      class="flex flex-col gap-7 justify-center items-center mx-auto px-20 mt-12"
   >
<<<<<<< HEAD
      <ToggleGroup type="single" v-model="form.structure" class="flex gap-5">
=======
      <ToggleGroup type="single" v-model="form.structure" class="w-[34rem] flex justify-between">
>>>>>>> a86b6555e36310aaa872001c01273c2cfbb857f9
         <ToggleGroupItem
            :value="StructureOptions.PLATE"
            class="h-[10rem] w-[8rem] p-5 flex flex-col gap-3 items-center justify-center"
         >
            <img src="/assets/icon-cadre.png" alt="" class="object-contain" />
            <h3 class="text-md uppercase font-bold">Plaque</h3>
         </ToggleGroupItem>
         <ToggleGroupItem
            :value="StructureOptions.TOTEM"
            class="h-[10rem] w-[8rem] p-5 flex flex-col gap-3 items-center justify-center"
         >
            <img src="/assets/icon-totem.png" alt="" class="object-contain" />
            <h3 class="text-md uppercase font-bold">Totem</h3>
         </ToggleGroupItem>
         <ToggleGroupItem
            :value="StructureOptions.LED"
            class="h-[10rem] w-[8rem] p-5 flex flex-col gap-3 items-center justify-center"
         >
            <img src="/assets/icon-led.png" alt="" class="object-contain" />
            <h3 class="text-md uppercase font-bold">LED</h3>
         </ToggleGroupItem>
         <ToggleGroupItem
            :value="StructureOptions.CUSTOM"
            class="h-[10rem] w-[8rem] p-5 flex flex-col gap-3 items-center justify-center"
         >
            <img src="/assets/icon-led.png" alt="" class="object-contain" />
            <h3 class="text-md uppercase font-bold">Custom</h3>
         </ToggleGroupItem>
      </ToggleGroup>
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
            class="w-full h-32 object-cover rounded-md"
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
