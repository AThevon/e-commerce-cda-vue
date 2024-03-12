<script lang="ts">
   import { defineComponent } from "vue";
   import Products from "@/components/products/Products.vue";

   export default defineComponent({
      name: "ProductsPage",
      components: {
         Products,
      },
   });
</script>

<template>
   <main>
      <h2>Products</h2>
      <Products />
   </main>
</template>

<style scoped lang="scss">
   @import "@/css/variables.scss";
   h2 {
      margin-block: 2rem;
      text-align: center;
   }
</style>
