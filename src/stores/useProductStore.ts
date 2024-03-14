import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
   state: () => ({
      products: [],
   }),
   actions: {
      async fetchProducts() {
         const response = await fetch("/data/products.json");
         const products = await response.json();
         this.products = products;
      },
   },
});
