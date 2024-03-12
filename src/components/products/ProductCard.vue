<script lang="ts">
   import { defineComponent } from "vue";
   import type { PropType } from "vue";
   import type { ProductType } from "@/types/ProductType";
   import Ratings from "./Ratings.vue";
   import CustomButton from "@/components/misc/CustomButton.vue";

   export default defineComponent({
      props: {
         product: Object as PropType<ProductType>,
      },
      components: { Ratings, CustomButton },
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
      <img :src="product.image" :alt="product.name" />
      <h3>{{ product.name }}</h3>
      <p>${{ product.unit_price }}</p>
      <Ratings :rating="rating" />
      <CustomButton
         :isRouterLink="true"
         :to="{ name: 'SingleProduct', params: { productId: product.id } }"
         class="button"
         >See product
      </CustomButton>
   </li>
</template>

<style scoped lang="scss">
   @import "@/css/variables.scss";
   li {
      height: 32rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;
      border-radius: 0.5rem;
      background-color: $white;
      img {
         width: 100%;
         height: 16rem;
         border-radius: 0.5rem;
      }
      h3,
      p {
         text-align: center;
         margin-bottom: 0.5rem;
      }
      h3 {
         font-size: 1.4rem;
         font-weight: 500;
         margin-top: 1rem;
      }
      p {
         font-size: 1.2rem;
         font-weight: 700;
      }
   }
</style>
