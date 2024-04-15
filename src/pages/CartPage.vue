<script lang="ts">
   import { defineComponent } from "vue";
   import CartProduct from "@/components/cart/CartProduct.vue";
   import { useCartStore } from "@/stores/useCartStore";
   import Button from "@/components/ui/button/Button.vue";
   import { formatPrice } from "@/lib/utils";
   import { toast } from "@/components/ui/toast";

   export default defineComponent({
      name: "CartPage",
      components: {
         Button,
         CartProduct,
      },
      computed: {
         cartStore() {
            return useCartStore();
         },
         total() {
            return formatPrice(this.cartStore.cartTotal);
         },
         ht() {
            return formatPrice(this.cartStore.cartHT);
         },
      },
      methods: {
         checkout() {
            // this.cartStore.checkout();
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
      <div class="grid grid-cols-5 w-full px-32 gap-6 my-10">
         <ul class="w-full col-span-3 flex flex-col gap-6">
            <li
               v-for="cartProduct in cartStore.cart"
               :key="cartProduct.product.id"
               class="w-full max-w-5xl"
            >
               <CartProduct :cartProduct="cartProduct" />
            </li>
         </ul>
         <div class="w-full h-full col-span-2">
            <div
               class="bg-white text-black text-center p-4 rounded-lg sticky top-8"
            >
               <h2 class="text-xl font-bold">Resume</h2>
               <div class="flex flex-col py-4 px-8 gap-1 text-start">
                  <p class="text-md">
                     Total items: {{ cartStore.cartQuantity }}
                  </p>
                  <p class="text-md">HT: {{ ht }}</p>
               </div>

               <h3 class="text-2xl font-bold">Total</h3>
               <p class="text-3xl font-bold">{{ total }}</p>
               <Button
                  class="bg-primary text-white font-bold py-2 px-4 rounded-lg mt-4"
                  @click="cartStore.checkout"
               >
                  Checkout
               </Button>
            </div>
         </div>
      </div>
   </main>
</template>
