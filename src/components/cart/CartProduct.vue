<script lang="ts">
   import { defineComponent } from "vue";
   import Button from "@/components/ui/button/Button.vue";
   import { useCartStore } from "@/stores/useCartStore";
   import {
      AlertDialog,
      AlertDialogTrigger,
   } from "@/components/ui/alert-dialog";
   import AlertDialogCart from "@/components/cart/AlertDialogCart.vue";
   import { formatPrice } from "@/lib/utils";

   export default defineComponent({
      name: "CartProduct",
      components: {
         Button,
         AlertDialog,
         AlertDialogCart,
         AlertDialogTrigger,
      },
      props: {
         cartProduct: {
            type: Object,
            required: true,
         },
      },
      computed: {
         cartStore() {
            return useCartStore();
         },
         productPrice() {
            return formatPrice(this.cartProduct.product.unit_price);
         },
      },
      methods: {
         removeOneProduct() {
            this.cartStore.removeOneFromCart(this.cartProduct.product.id);
         },
         removeProduct() {
            this.cartStore.removeProductFromCart(this.cartProduct.product.id);
         },
      },
   });
</script>

<template>
   <div
      class="cart-product bg-white grid grid-cols-5 gap-4 rounded-lg shadow-md p-4"
   >
      <img
         :src="cartProduct.product.image"
         :alt="cartProduct.product.name"
         @click="$router.push(`/products/${cartProduct.product.id}`)"
         class="col-span-1 w-full h-full object-cover rounded-lg hover:scale-[1.03] cursor-pointer transition-transform duration-200 ease-in-out"
      />
      <div class="col-span-3 flex flex-col gap-4 justify-between">
         <h2 class="text-2xl font-bold">{{ cartProduct.product.name }}</h2>
         <p class="text-lg mt-auto">{{ productPrice }}</p>
         <div class="flex w-[6.5rem] justify-between items-center">
            <AlertDialog v-if="cartProduct.quantity <= 1">
               <AlertDialogTrigger as-child>
                  <Button class="text-lg px-2 w-[2rem] h-[2rem]">-</Button>
               </AlertDialogTrigger>
               <AlertDialogCart :action="removeProduct" />
            </AlertDialog>
            <Button
               v-else
               class="text-lg px-2 w-[2rem] h-[2rem]"
               @click="removeOneProduct()"
               >-</Button
            >
            <p class="text-lg">{{ cartProduct.quantity }}</p>
            <Button
               class="text-lg px-2 w-[2rem] h-[2rem]"
               @click="cartStore.addToCart(cartProduct.product)"
            >
               +
            </Button>
         </div>
      </div>
      <div class="col-span-1 flex flex-col justify-end">
         <AlertDialog>
            <AlertDialogTrigger as-child>
               <Button variant="destructive" class="w-full text-sm"
                  >Remove</Button
               >
            </AlertDialogTrigger>
            <AlertDialogCart :action="removeProduct" />
         </AlertDialog>
      </div>
   </div>
</template>

<style scoped></style>
