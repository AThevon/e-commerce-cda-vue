<script lang="ts">
   import { defineComponent, h } from "vue";
   import type { PropType } from "vue";
   import type { ProductType } from "@/types/ProductType";
   import Ratings from "./Ratings.vue";
   import { Button } from "../ui/button";
   import { useCartStore } from "@/stores/useCartStore";
   import { ToastAction, toast } from "../ui/toast";

   export default defineComponent({
      props: {
         product: { type: Object as PropType<ProductType>, required: true },
      },
      components: { Ratings, Button },
      computed: {
         cartStore() {
            return useCartStore();
         },
      },
      methods: {
         goToProduct() {
            if (this.product) {
               this.$router.push({
                  name: "SingleProduct",
                  params: { productId: this.product.id },
               });
            }
         },
         addToCart() {
            if (this.product) this.cartStore.addToCart(this.product);
            toast({
               title: `Item added to cart :`,
               description: this.product?.name,
               action: h(
                  ToastAction,
                  {
                     altText: "Go to cart",
                     onClick: () => {
                        this.$router.push({ name: "Cart" });
                     },
                  },
                  {
                     default: () => "Go to cart",
                  }
               ),
            });
         },
      },
   });
</script>

<template>
   <li
      v-if="product"
      @click="goToProduct"
      class="flex flex-col items-center justify-center pb-4 rounded-lg bg-white overflow-hidden cursor-pointer transition-all ease-in duration-200 hover:shadow-lg active:scale-95 active:shadow-none"
   >
      <div class="overflow-hidden w-full">
         <img
            rel="preload"
            :src="product.image"
            :alt="product.name"
            class="w-full h-72 object-cover transition-all ease-out duration-300"
         />
      </div>
      <h3 class="text-center mt-2 mb-1 text-lg font-medium">
         {{ product.name }}
      </h3>
      <p class="text-center mb-1 text-lg font-bold">
         ${{ product.unit_price }}
      </p>
      <div class="mt-2 w-full flex flex-col items-center gap-2 px-4">
         <Ratings :rating="product.woodies" />
         <Button @click.stop="addToCart">
            <FontAwesomeIcon icon="shopping-cart" class="mr-3 -ml-3" />Add to
            cart
         </Button>
      </div>
   </li>
</template>

<style scoped lang="scss">
   li:hover {
      img {
         transform: scale(1.1);
      }
   }
</style>
