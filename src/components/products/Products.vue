<script lang="ts">
   import { defineComponent } from "vue";
   import type { ProductType } from "@/types/ProductType";
   import ProductCard from "@/components/products/ProductCard.vue";

   export default defineComponent({
      name: "Products",
      components: {
         ProductCard,
      },
      data() {
         return {
            productData: [] as ProductType[],
         };
      },
      methods: {
         isLowestPrice(id: number): boolean {
            return this.lowestPriceProductIds.includes(id);
         },
         fetchProductData() {
            fetch("/data/products.json")
               .then((response) => response.json())
               .then((data) => {
                  this.productData = data;
               })
               .catch((error) =>
                  console.error("Error fetching the local json:", error)
               );
         },
      },
      computed: {
         lowestPriceProductIds(): number[] {
            const lowestPrice = Math.min(
               ...this.productData.map(
                  (product: ProductType) => product.unit_price
               )
            );
            return this.productData
               .filter((product) => product.unit_price === lowestPrice)
               .map((product) => product.id);
         },
      },
      mounted() {
         this.fetchProductData();
      },
   });
</script>

<template>
   <div>
      <p>
         Nb of products : <span>{{ productData.length }}</span>
      </p>
      <ul>
         <ProductCard
            v-for="product in productData"
            :key="product.id"
            :product="(product as ProductType)"
            :class="{ lowestPrice: isLowestPrice(product.id) }"
         />
      </ul>
   </div>
</template>

<style scoped lang="scss">
   @import "@/css/variables.scss";
   p {
      text-align: center;
      margin-block: 1rem;
      span {
         font-weight: 700;
         font-size: 1.2rem;
      }
   }
   ul {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
      gap: 2rem;
      max-width: 70rem;
      margin-inline: auto;
      margin-block: 3rem;
      .lowestPrice {
         position: relative;
         &::after {
            content: "Best deal !";
            position: absolute;
            text-transform: uppercase;
            font-weight: 500;
            top: 1rem;
            right: 1rem;
            background-color: rgba(0, 0, 0, 0.7);
            color: $white;
            padding: 1rem 2rem;
            border-radius: 0 0.5rem 0 0.5rem;
         }
      }
   }
</style>
