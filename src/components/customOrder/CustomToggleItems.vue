<script lang="ts">
   import { defineComponent } from "vue";
   import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
   import { StructureOptions } from "@/types/CustomOrderType";

   export default defineComponent({
      name: "CustomToggleItems",
      components: {
         ToggleGroup,
         ToggleGroupItem,
      },
      props: ["selectedStructure"],
      emits: ["update-structure"],
      data() {
         return {
            structure: this.selectedStructure,
            structures: [
               {
                  name: "Plate",
                  img: "/assets/icon-cadre.png",
                  value: StructureOptions.PLATE,
               },
               {
                  name: "Totem",
                  img: "/assets/icon-totem.png",
                  value: StructureOptions.TOTEM,
               },
               {
                  name: "LED",
                  img: "/assets/icon-led.png",
                  value: StructureOptions.LED,
               },
               {
                  name: "Custom",
                  img: "/assets/icon-led.png",
                  value: StructureOptions.CUSTOM,
               },
            ],
         };
      },
      watch: {
         structure(newVal, oldVal) {
            if (newVal !== oldVal) {
               this.$emit("update-structure", newVal);
            }
         },
      },
   });
</script>

<template>
   <ToggleGroup
      type="single"
      class="w-[34rem] flex justify-between"
      v-model="structure"
   >
      <ToggleGroupItem
         v-for="structure in structures"
         :value="structure.value"
         class="h-[10rem] w-[8rem] p-5 flex flex-col gap-3 items-center justify-center"
         :class="
            structure.value === selectedStructure ? 'pointer-events-none' : ''
         "
         :key="structure.value"
      >
         <img :src="structure.img" alt="" class="object-contain" />
         <h3 class="text-md uppercase font-bold">{{ structure.name }}</h3>
      </ToggleGroupItem>
   </ToggleGroup>
</template>
