<script lang="ts">
   import { defineComponent } from "vue";
   import type { PropType } from "vue";
   import type { ProductType } from "@/types/ProductType";
   import Ratings from "./Ratings.vue";
   import { Button } from "../ui/button";

   export default defineComponent({
      props: {
         product: Object as PropType<ProductType>,
      },
      components: { Ratings, Button },
      computed: {
         rating() {
            if (!this.product || this.product.rating == null) return 0;
            let roundedRating = Math.round(this.product.rating * 10) / 10;
            return (roundedRating / 5) * 100;
         },
      },
   });
</script>

<template>
   <li v-if="product">
      <div class="img-container">
         <img :src="product.image" :alt="product.name" />
      </div>
      <h3>{{ product.name }}</h3>
      <p>${{ product.unit_price }}</p>
      <Ratings :rating="rating" />
      <Button as-child>
         <router-link
            :to="{ name: 'SingleProduct', params: { productId: product.id } }"
         >
            See product
         </router-link>
      </Button>
   </li>
</template>

<style scoped lang="scss">
   @import "@/css/variables.scss";
   li {
      height: 32rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      padding-bottom: 1rem;
      border-radius: 0.5rem;
      background-color: $white;
      overflow: hidden;
      transition: all 0.15s ease-in;
      &:hover {
         box-shadow: 0 0 1rem 0.2rem $light-grey;
         img {
            transform: scale(1.1);
         }
      }
      .img-container {
         width: 100%;
         height: 16rem;
         overflow: hidden;
      }
      img {
         width: 100%;
         transition: all 0.25s ease-out;
      }
      h3,
      p {
         text-align: center;
         margin-bottom: 0.5rem;
      }
      h3 {
         font-size: 1.4rem;
         font-weight: 500;
         margin-top: 0.5rem;
      }
      p {
         font-size: 1.2rem;
         font-weight: 700;
      }
   }
</style>
