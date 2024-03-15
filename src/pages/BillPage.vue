<script lang="ts">
   import { defineComponent } from "vue";
   import Bill from "@/components/bill/Bill.vue";

   export default defineComponent({
      name: "BillPage",
      components: { Bill },
   });
</script>

<template>
   <h1
      class="text-center my-12 mx-auto text-2xl font-bold uppercase text-white bg-secondary p-4 rounded-lg w-fit"
   >
      Bill
   </h1>
   <Bill />
</template>
