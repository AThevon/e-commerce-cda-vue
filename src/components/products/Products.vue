<script lang="ts">
   import { defineComponent } from "vue";
   import type { ProductType } from "@/types/ProductType";
   import ProductCard from "@/components/products/ProductCard.vue";
   import { Button } from "../ui/button";
   import { useProductStore } from "@/stores/useProductStore";
   import ProductPagination from "@/components/products/ProductPagination.vue";

   export default defineComponent({
      name: "Products",
      components: {
         ProductCard,
         Button,
         ProductPagination,
      },
      data() {
         return {
            nbShownProducts: 10,
         };
      },
      computed: {
         productStore() {
            return useProductStore();
         },
         displayedProducts(): ProductType[] {
            return this.productStore.products.slice(0, this.nbShownProducts);
         },
         lowestPriceProductIds(): number[] {
            if (!this.productStore.products.length) return [];
            const lowestPrice = Math.min(
               ...this.productStore.products.map(
                  (product: ProductType) => product.unit_price
               )
            );
            return this.productStore.products
               .filter(
                  (product: ProductType) => product.unit_price === lowestPrice
               )
               .map((product: ProductType) => product.id);
         },
      },
      methods: {
         async fetchProductData() {
            await this.productStore.fetchProducts();
         },
         calculateProductsPerPage() {
            const cardWidth = 17.5 + 4; // 17.5rem card width + 5rem margin
            const screenWidthInRem =
               window.innerWidth /
               parseFloat(getComputedStyle(document.documentElement).fontSize);
            // Assuming each card takes about 17.5rem of width, adjust based on your actual card size and margins
            this.nbShownProducts = Math.floor(screenWidthInRem / cardWidth);
            // Ensure there's at least one product shown
            this.nbShownProducts = Math.max(this.nbShownProducts, 1);
         },
      },
      mounted() {
         this.fetchProductData();
         this.calculateProductsPerPage();
         window.addEventListener("resize", this.calculateProductsPerPage);
      },
      beforeUnmount() {
         window.removeEventListener("resize", this.calculateProductsPerPage);
      },
   });
</script>

<template>
   <div class="flex flex-col items-center md:px-20 px-0">
      <ul>
         <ProductCard
            v-for="product in displayedProducts"
            :key="product.id"
            :product="(product as ProductType)"
         />
      </ul>
      <ProductPagination />
   </div>
</template>

<style scoped lang="scss">
   @import "@/css/variables.scss";
   ul {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(17.5rem, 1fr));
      gap: 2rem;
      @media screen and (max-width: 768px) {
         grid-template-columns: 1fr;
      }
      width: 100%;
      max-width: 100rem;
      margin-inline: 4rem;
      margin-block: 3rem 5rem;
   }
</style>
