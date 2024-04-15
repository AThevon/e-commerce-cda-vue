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
               structure: StructureOptions.PLATE,
               files: [],
               message: "",
            },
            StructureOptions,
         };
      },
      methods: {
         submitForm() {
            console.log(this.form);
         },
      },
      watch: {
         form: {
            deep: true,
            handler() {
               console.log(this.form);
            },
         },
      },
   });
</script>

<template>
   <form @submit.prevent="submitForm">
      <ToggleGroup type="single">
         <ToggleGroupItem
            :value="StructureOptions.PLATE"
            v-model="form.structure"
            class="h-[10rem] w-[8rem] p-5"
         >
            <img src="/assets/icon-totem.png" alt="" class="object-contain" />
         </ToggleGroupItem>
         <ToggleGroupItem
            :value="StructureOptions.TOTEM"
            v-model="form.structure"
            class="h-[10rem] w-[8rem] p-5"
         >
            <img src="/assets/icon-totem.png" alt="" class="object-contain" />
         </ToggleGroupItem>
         <ToggleGroupItem
            :value="StructureOptions.LED"
            v-model="form.structure"
            class="h-[10rem] w-[8rem] p-5"
         >
            <img src="/assets/icon-totem.png" alt="" class="object-contain" />
         </ToggleGroupItem>
         <ToggleGroupItem
            :value="StructureOptions.CUSTOM"
            v-model="form.structure"
            class="h-[10rem] w-[8rem] p-5"
         >
            <img src="/assets/icon-totem.png" alt="" class="object-contain" />
         </ToggleGroupItem>
      </ToggleGroup>
      <textarea
         v-model="form.message"
         placeholder="Write a message here..."
      ></textarea>
      <Button type="submit">Submit</Button>
   </form>
</template>
