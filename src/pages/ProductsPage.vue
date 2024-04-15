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
   <main class="w-full mx-auto pt-10">
      <h2 class="text-xl font-bold text-center mt-12 uppercase">Products</h2>
      <Products />
   </main>
</template>

<style scoped lang="scss">
   main::after {
      content: "";
      display: block;
      height: 30rem;
      width: 120%;
      transform: rotate(5deg) translateX(-10%) translateY(20%);
      background-color: hsl(var(--light-grey));
      position: fixed;
      bottom: 0;
      z-index: -1;
   }
</style>
