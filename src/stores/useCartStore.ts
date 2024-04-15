import { defineStore } from "pinia";
import type { ProductType } from "@/types/ProductType";

type CartProduct = { product: ProductType; quantity: number };

export const useCartStore = defineStore("cart", {
   state: () => ({
      cart: JSON.parse(localStorage.getItem("cart") || "[]") as CartProduct[],
   }),
   getters: {
      cartTotal: (state) =>
         state.cart.reduce(
            (acc, cartProduct) =>
               acc + cartProduct.product.unit_price * cartProduct.quantity,
            0
         ),
      cartHT: (state) =>
         state.cart.reduce(
            (acc, cartProduct) =>
               acc + cartProduct.product.unit_price * cartProduct.quantity,
            0
         ) * 0.8,
      cartQuantity: (state) =>
         state.cart.reduce((acc, cartProduct) => acc + cartProduct.quantity, 0),
   },
   actions: {
      addToCart(productToAdd: ProductType) {
         const existingProductIndex = this.cart.findIndex(
            (cartProduct) => cartProduct.product.id === productToAdd.id
         );

         if (existingProductIndex !== -1) {
            this.cart[existingProductIndex].quantity++;
         } else {
            this.cart.push({ product: productToAdd, quantity: 1 });
         }

         this.saveCart();
      },
      removeOneFromCart(productId: number) {
         const existingProductIndex = this.cart.findIndex(
            (cartProduct) => cartProduct.product.id === productId
         );

         if (existingProductIndex !== -1) {
            if (this.cart[existingProductIndex].quantity > 1) {
               this.cart[existingProductIndex].quantity--;
            } else {
               this.removeProductFromCart(productId);
            }
         }

         this.saveCart();
      },
      removeProductFromCart(productId: number) {
         const existingProductIndex = this.cart.findIndex(
            (cartProduct) => cartProduct.product.id === productId
         );

         if (existingProductIndex !== -1) {
            this.cart.splice(existingProductIndex, 1);
         }

         this.saveCart();
      },
      saveCart() {
         localStorage.setItem("cart", JSON.stringify(this.cart));
      },
      clearCart() {
         this.cart = [];
         this.saveCart();
      },
      checkout() {
         // Call API to checkout
         // Clear cart
         this.cart = [];
         this.saveCart();
      },
   },
});
