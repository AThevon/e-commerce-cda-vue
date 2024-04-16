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
      computed: {
         productStore() {
            return useProductStore();
         },
         paginatedProducts() {
            return this.productStore.paginatedProducts;
         },
         currentPage: {
            get() {
               return this.productStore.currentPage;
            },
            set(value: any) {
               this.productStore.setPage(value);
            },
         },
      },
      methods: {
         fetchProducts() {
            this.productStore.fetchProducts();
         },
         handleResize() {
            console.log("Resizing..."); // Check if this logs on window resize
            this.productStore.adjustProductsPerPage();
         },
      },
      mounted() {
         this.fetchProducts();
         this.productStore.adjustProductsPerPage();
         window.addEventListener("resize", this.handleResize);
      },
      beforeUnmount() {
         window.removeEventListener("resize", this.handleResize);
      },
   });
</script>

<template>
   <div class="flex flex-col items-center md:px-20 px-0">
      <ul>
         <ProductCard
            v-for="product in paginatedProducts"
            :key="product.id"
            :product="product"
            class="min-w-0 md:min-w-[17.5rem]"
         />
      </ul>
      <ProductPagination
         v-model="currentPage"
         @update:page="(value) => (currentPage = value)"
      />
   </div>
</template>

<style scoped lang="scss">
   ul {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(17.5rem, 1fr));
      gap: 2rem;
      @media screen and (max-width: 768px) {
         grid-template-columns: 1fr;
      }
      width: 100%;
      max-width: 120rem;
      margin-inline: 4rem;
      margin-block: 3rem 5rem;
   }
</style>
