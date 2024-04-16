import { defineStore } from "pinia";
import type { ProductType } from "@/types/ProductType";

export const useProductStore = defineStore("product", {
   state: () => ({
      products: [] as ProductType[],
      currentPage: 1,
      productsPerPage: 4,
   }),
   getters: {
      paginatedProducts: (state) => {
         const start = (state.currentPage - 1) * state.productsPerPage;
         const end = start + state.productsPerPage;
         return state.products.slice(start, end);
      },
      totalPages: (state) =>
         Math.ceil(state.products.length / state.productsPerPage),
   },
   actions: {
      async fetchProducts() {
         const response = await fetch("/data/products.json")
            .then((res) => res.json())
            .catch((error) => {
               console.log(error);
            });
         this.products = response;
      },
      setPage(page: number) {
         if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
         }
      },
      adjustProductsPerPage() {
         const width = window.innerWidth;
         if (width < 1064) {
           this.productsPerPage = 2;
         } else if (width < 1376) {
           this.productsPerPage = 3;
         } else if (width < 1688) {
           this.productsPerPage = 4;
         } else if (width < 2000) {
           this.productsPerPage = 5;
         } else {
           this.productsPerPage = 6;
         }
       },
   },
});
