<script lang="ts">
   import { defineComponent } from "vue";
   import type { ProductType } from "@/types/ProductType";
   import ProductCard from "@/components/products/ProductCard.vue";
   import { Button } from "../ui/button";

   export default defineComponent({
      name: "Products",
      components: {
         ProductCard,
         Button,
      },
      data() {
         return {
            productData: [] as ProductType[],
            displayedProducts: [] as ProductType[],
            nbShownProducts: 6,
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
                  this.displayedProducts = this.productData.slice(
                     0,
                     this.nbShownProducts
                  );
               })
               .catch((error) =>
                  console.error("Error fetching the local json:", error)
               );
         },
         showMore() {
            const nextProducts = this.productData.slice(
               this.displayedProducts.length,
               this.displayedProducts.length + this.nbShownProducts
            );
            this.displayedProducts =
               this.displayedProducts.concat(nextProducts);
            if (nextProducts.length > 0) {
               this.$nextTick(() => {
                  window.scrollBy({
                     top: window.innerHeight - 160,
                     behavior: "smooth",
                  });
               });
            }
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
   <div class="flex flex-col items-center">
      <p>
         Nb of products : <span>{{ displayedProducts.length }}</span>
      </p>
      <ul>
         <ProductCard
            v-for="product in displayedProducts"
            :key="product.id"
            :product="(product as ProductType)"
            :class="{ lowestPrice: isLowestPrice(product.id) }"
         />
      </ul>
      <Button
         v-if="displayedProducts.length < productData.length"
         class="shadow-lg mb-8"
         variant="white"
         @click="showMore"
      >
         Show more
      </Button>
   </div>
</template>

<style scoped lang="scss">
   @import "@/css/variables.scss";
   p {
      text-align: center;
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
      margin-block: 3rem 2rem;
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
