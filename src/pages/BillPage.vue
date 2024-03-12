<script lang="ts">
   import { defineComponent } from "vue";
   import Bill from "@/components/bill/Bill.vue";

   export default defineComponent({
      name: "BillPage",
      components: { Bill },
   });
</script>

<template>
   <h1>Bill</h1>
   <Bill />
</template>

<style scoped lang="scss">
   @import "@/css/variables.scss";
   h1 {
      text-align: center;
      margin-block: 3rem 2rem;
      font-size: 2rem;
      font-weight: 700;
      text-transform: uppercase;
      color: $white;
      background-color: $secondary-color;
      padding: 1rem 3rem;
      border-radius: 8px;
      width: fit-content;
      margin-inline: auto;
   }
</style>
