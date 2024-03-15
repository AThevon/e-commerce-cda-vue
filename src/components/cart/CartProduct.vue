<script lang="ts">
   import { defineComponent } from "vue";
   import Button from "@/components/ui/button/Button.vue";
   import { useCartStore } from "@/stores/useCartStore";

   export default defineComponent({
      name: "CartProduct",
      components: { Button },
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
      },
      methods: {
         removeProduct() {
            this.cartStore.removeFromCart(this.cartProduct.product.id);
         },
      },
   });
</script>

<template>
   <div class="cart-product bg-white rounded-lg shadow-md p-4 my-4">
      <div class="info">
         <h2 class="text-2xl font-bold mb-2">{{ cartProduct.product.name }}</h2>
         <p class="text-lg mb-2">
            Price: ${{ cartProduct.product.unit_price }}
         </p>
         <p class="text-lg">Quantity: {{ cartProduct.quantity }}</p>
      </div>
      <Button variant="destructive" @click="removeProduct">Remove</Button>
   </div>
</template>

<style scoped></style>
