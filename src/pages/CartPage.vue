<script lang="ts">
   import { defineComponent } from "vue";
   import CartProduct from "@/components/cart/CartProduct.vue";

   export default defineComponent({
      name: "CartPage",
      components: {
         CartProduct,
      },
      data() {
         return {
            products: [
               {
                  id: 1,
                  name: "Product 1",
                  price: 100,
                  quantity: 1,
               },
               {
                  id: 2,
                  name: "Product 2",
                  price: 200,
                  quantity: 1,
               },
            ],
         };
      },
   });
</script>

<template>
   <main class="flex flex-col items-center">
      <h1
         class="bg-secondary inline-block text-center m-8 text-2xl font-bold uppercase text-white p-4 rounded-lg mx-auto"
      >
         Cart
      </h1>
      <ul class="w-full max-w-2xl">
         <li v-for="product in products" :key="product.id">
            <CartProduct :product="product" />
         </li>
      </ul>
   </main>
</template>

<style scoped lang="scss">
   @import "@/css/variables.scss";
   ul {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      li {
         width: 100%;
         max-width: 40rem;
      }
   }
</style>
