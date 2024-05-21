<script lang="ts">
   import { defineComponent } from "vue";
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
      <ul
         class="grid grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] gap-8 w-full max-w-[120rem] mx-16 my-12 mb-20"
      >
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
