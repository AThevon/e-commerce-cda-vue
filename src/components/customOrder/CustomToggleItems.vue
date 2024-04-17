<script lang="ts">
   import { defineComponent } from "vue";
   import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
   import { useCustomOrderStore } from "@/stores/useCustomOrderStore";

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
         };
      },
      computed: {
         customOrderStore() {
            return useCustomOrderStore();
         },
         structures() {
            return this.customOrderStore.structures;
         },
      },
      methods: {
         fetchStructures() {
            this.customOrderStore.fetchStructures();
         },
      },
      watch: {
         structure(newVal, oldVal) {
            if (newVal !== oldVal) {
               this.$emit("update-structure", newVal);
            }
         },
      },
      mounted() {
         this.fetchStructures();
      },
   });
</script>

<template>
   <ToggleGroup
      v-if="structures.length > 0"
      type="single"
      class="w-[34rem] flex justify-between"
      v-model="structure"
   >
      <ToggleGroupItem
         v-for="structure in structures"
         :value="structure.name"
         class="h-[10rem] w-[8rem] p-5 flex flex-col gap-3 items-center justify-center"
         :class="
            structure.name === selectedStructure
               ? 'pointer-events-none'
               : 'hover:bg-white hover:shadow-lg cursor-pointer'
         "
         :key="structure.id"
      >
         <img :src="structure.img" alt="" class="object-contain" />
         <h3 class="text-md uppercase font-bold">{{ structure.label }}</h3>
      </ToggleGroupItem>
   </ToggleGroup>
</template>
