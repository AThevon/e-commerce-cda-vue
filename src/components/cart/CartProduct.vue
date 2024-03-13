<script lang="ts">
   import { defineComponent } from "vue";
   import Button from "@/components/ui/button/Button.vue";

   export default defineComponent({
      name: "CartProduct",
      components: { Button },
      props: {
         product: {
            type: Object,
            required: true,
         },
      },
      methods: {
         removeProduct() {
            this.$emit("removeProduct", this.product);
         },
      },
   });
</script>

<template>
   <div class="cart-product">
      <div class="info">
         <h2>{{ product.name }}</h2>
         <p>Price: ${{ product.price }}</p>
         <p>Quantity: {{ product.quantity }}</p>
      </div>
      <Button variant="destructive" @click="removeProduct">Remove</Button>
   </div>
</template>

<style scoped lang="scss">
   @import "@/css/variables.scss";
   .cart-product {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      margin-block: 1rem;
      border-radius: 8px;
      background-color: $white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      .info {
         h2 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-block: 0.5rem;
         }
         p {
            font-size: 1.2rem;
            margin-block: 0.5rem;
         }
      }
   }
</style>
