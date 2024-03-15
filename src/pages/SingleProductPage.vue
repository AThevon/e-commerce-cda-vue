<script lang="ts">
   import { defineComponent, h } from "vue";
   import type { ProductType } from "@/types/ProductType";
   import Ratings from "@/components/products/Ratings.vue";
   import { Button } from "@/components/ui/button";
   import AspectRatio from "@/components/ui/aspect-ratio/AspectRatio.vue";
   import { useCartStore } from "@/stores/useCartStore";
   import { useProductStore } from "@/stores/useProductStore"; // Import the product store
   import { ToastAction, toast } from "@/components/ui/toast";

   export default defineComponent({
      name: "SingleProductPage",
      components: {
         Button,
         Ratings,
         AspectRatio,
      },
      computed: {
         // Access product store and cart store
         productStore() {
            return useProductStore();
         },
         cartStore() {
            return useCartStore();
         },
         // Find the current product based on the route parameter
         product() {
            const productId = this.$route.params.productId;
            return (
               this.productStore.products.find(
                  (p) => String(p.id) === productId
               ) || ({} as ProductType)
            );
         },
         rating() {
            if (!this.product) return 0;
            return (this.product.rating / 5) * 100;
         },
      },
      methods: {
         navigateToProduct(direction: string) {
            const currentIndex = this.productStore.products.findIndex(
               (p) => String(p.id) === this.$route.params.productId
            );
            let newIndex =
               direction === "next" ? currentIndex + 1 : currentIndex - 1;

            // Looping system
            if (newIndex >= this.productStore.products.length) {
               newIndex = 0;
            } else if (newIndex < 0) {
               newIndex = this.productStore.products.length - 1;
            }

            const newId = this.productStore.products[newIndex].id;
            this.$router.push({
               name: "SingleProduct",
               params: { productId: newId },
            });
         },
         addToCart() {
            this.cartStore.addToCart(this.product);
            toast({
               title: `Item added to cart:`,
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
      mounted() {
         // Ensure products are fetched when the component mounts
         if (this.productStore.products.length === 0) {
            this.productStore.fetchProducts();
         }
      },
   });
</script>

<template>
   <div>
      <div class="flex items-center justify-between my-8 px-12">
         <Button as-child>
            <router-link :to="{ name: 'Products' }">Back</router-link>
         </Button>
         <h2 class="text-center font-bold text-lg uppercase">
            {{ product.name }}
         </h2>
      </div>
      <Button
         size="icon"
         class="absolute top-1/2 transform -translate-y-1/2 rounded-md text-lg font-bold py-6 px-8 left-20 transition-all duration-300 hover:py-7 hover:px-9 hover:left-[4.3rem] active:scale-95"
         @click="navigateToProduct('previous')"
      >
         <font-awesome-icon icon="arrow-left" />
      </Button>
      <Button
         size="icon"
         class="absolute top-1/2 transform -translate-y-1/2 rounded-md text-lg font-bold py-6 px-8 right-20 transition-all duration-300 hover:py-7 hover:px-9 hover:right-[4.3rem] active:scale-95"
         @click="navigateToProduct('next')"
      >
         <font-awesome-icon icon="arrow-right" />
      </Button>
      <div
         id="main-container"
         class="relative h-[70vh] mx-40 flex justify-between p-28 px-16 rounded-md bg-white overflow-hidden"
      >
         <div class="w-[45rem] flex flex-col justify-center z-10">
            <AspectRatio :ratio="4 / 3">
               <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover shadow-lg rounded-md"
               />
            </AspectRatio>
         </div>
         <div class="justify-end items-end text-end gap-4 z-20">
            <h3 class="text-3xl font-main">{{ product.name }}</h3>
            <p class="text-xl">{{ product.description }}</p>
            <p class="text-2xl font-bold">{{ product.unit_price }}€</p>
            <Ratings :rating="rating" />
            <Button @click.stop="addToCart" class="mt-2">
               <font-awesome-icon icon="shopping-cart" class="mr-3 -ml-3" />Add
               to cart
            </Button>
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
   #main-container::before {
      content: "";
      position: absolute;
      top: -110%;
      left: -70%;
      transform: rotate(-45deg);
      width: 200%;
      height: 120%;
      background-color: hsl(var(--light-grey));
      border-radius: 0.5rem;
   }
</style>
