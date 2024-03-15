<script lang="ts">
   import { defineComponent } from "vue";
   import CartProduct from "@/components/cart/CartProduct.vue";
   import { useCartStore } from "@/stores/useCartStore";

   export default defineComponent({
      name: "CartPage",
      components: {
         CartProduct,
      },
      computed: {
         cartStore() {
            return useCartStore();
         },
      },
   });
</script>

<template>
   <main class="flex flex-col items-center">
      <h1
         class="bg-secondary inline-block text-center my-8 mx-auto text-2xl font-bold uppercase text-white py-4 px-4 rounded-lg"
      >
         Cart
      </h1>
      <ul class="w-full max-w-2xl flex flex-col items-center justify-center">
         <li
            v-for="cartProduct in cartStore.cart"
            :key="cartProduct.product.id"
            class="w-full max-w-5xl"
         >
            <CartProduct :cartProduct="cartProduct" />
         </li>
      </ul>
   </main>
</template>
