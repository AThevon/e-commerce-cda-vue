import { defineStore } from 'pinia';
import type { ProductType } from "@/types/ProductType";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [] as ProductType[],
    currentPage: 1,
    productsPerPage: 10,
  }),
  getters: {
    paginatedProducts: (state) => {
      const start = (state.currentPage - 1) * state.productsPerPage;
      const end = start + state.productsPerPage;
      return state.products.slice(start, end);
    },
  },
  actions: {
    async fetchProducts() {
      const response = await fetch("/data/products.json");
      const products = await response.json();
      this.products = products;
    },
    setPage(page: number) {
      this.currentPage = page;
    },
  },
});
