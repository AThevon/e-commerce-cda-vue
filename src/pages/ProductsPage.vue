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
      <h2 class="text-xl font-bold text-center mt-8 mb-4 uppercase">Products</h2>
      <Products />
   </main>
</template>

<style scoped lang="scss">
   @import "@/css/variables.scss";
   main::after {
      content: "";
      display: block;
      height: 30rem;
      width: 120%;
      transform: rotate(5deg) translateX(-10%) translateY(20%);
      background-color: $light-grey;
      position: fixed;
      bottom: 0;
      z-index: -1;
   }
</style>
