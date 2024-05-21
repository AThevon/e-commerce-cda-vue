<script lang="ts">
   import { defineComponent, h } from "vue";
   import type { ProductType } from "@/types/ProductType";
   import Ratings from "@/components/products/Ratings.vue";
   import { Button } from "@/components/ui/button";
   import AspectRatio from "@/components/ui/aspect-ratio/AspectRatio.vue";
   import { useCartStore } from "@/stores/useCartStore";
   import { useProductStore } from "@/stores/useProductStore"; // Import the product store
   import { ToastAction, toast } from "@/components/ui/toast";
   import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

   export default defineComponent({
      name: "SingleProductPage",
      components: {
         Button,
         Ratings,
         AspectRatio,
         FontAwesomeIcon,
      },
      computed: {
         productStore() {
            return useProductStore();
         },
         cartStore() {
            return useCartStore();
         },
         product() {
            const productId = this.$route.params.productId;
            return (
               this.productStore.products.find(
                  (p) => String(p.id) === productId
               ) || ({} as ProductType)
            );
         },
      },
      methods: {
         navigateToProduct(direction: string) {
            const currentIndex = this.productStore.products.findIndex(
               (p) => String(p.id) === this.$route.params.productId
            );
            let newIndex =
               direction === "next" ? currentIndex + 1 : currentIndex - 1;

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
         addWoodie() {
            // Ensure that localStorage returns a valid JSON string "{}" if the item "woodies" does not exist
            const woodies = JSON.parse(localStorage.getItem("woodies") || "{}");
            const productId = this.product.id;

            if (woodies[productId]) {
               // User has already given a woodie, remove it
               delete woodies[productId];
               this.productStore.removeWoodie(this.product); // Assuming you have a removeWoodie method in your store
               toast({
                  title: `You removed your woodie!`,
                  variant: "default",
               });
            } else {
               // User has not given a woodie, add it
               woodies[productId] = true;
               this.productStore.addWoodie(this.product);
               toast({
                  title: `You gave a woodie!`,
                  variant: "default",
               });
            }

            // Update localStorage
            localStorage.setItem("woodies", JSON.stringify(woodies));
         },
      },
      mounted() {
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
            <RouterLink :to="{ name: 'Products' }">Back</RouterLink>
         </Button>
         <h2 class="text-center font-bold text-lg uppercase">
            {{ product.name }}
         </h2>
      </div>
      <Button
         size="icon"
         class="hidden xl:flex absolute top-1/2 transform -translate-y-1/2 rounded-md text-lg font-bold py-6 px-8 left-20 transition-all duration-300 hover:py-7 hover:px-9 hover:left-[4.3rem] active:scale-95"
         @click="navigateToProduct('previous')"
      >
         <FontAwesomeIcon icon="arrow-left" />
      </Button>
      <Button
         size="icon"
         class="hidden xl:flex absolute top-1/2 transform -translate-y-1/2 rounded-md text-lg font-bold py-6 px-8 right-20 transition-all duration-300 hover:py-7 hover:px-9 hover:right-[4.3rem] active:scale-95"
         @click="navigateToProduct('next')"
      >
         <FontAwesomeIcon icon="arrow-right" />
      </Button>
      <div
         id="main-container"
         class="relative h-full xl:h-[70vh] mx-0 sm:mx-20 xl:mx-40 mb-10 xl:mb-0 flex flex-col xl:flex-row justify-between items-center xl:items-start gap-8 xl:gap-0 p-16 rounded-md bg-white overflow-hidden"
      >
         <img
            :src="product.image"
            :alt="product.name"
            class="w-[70%] h-full z-10 object-contain drop-shadow"
         />
         <div
            class="flex flex-col justify-end items-center xl:items-end text-center xl:text-end gap-2 h-full z-20"
         >
            <h3 class="text-3xl font-main">{{ product.name }}</h3>
            <p class="text-xl max-w-64">{{ product.description }}</p>
            <p class="text-2xl font-bold">{{ product.unit_price }}€</p>
            <Ratings :rating="product.woodies" containerClass="justify-end" />
            <Button @click.stop="addWoodie" variant="outline" class="w-60">
               <img
                  src="/assets/icon-woodies.png"
                  alt="Woodies"
                  class="w-7 h-7 mr-3 -ml-3 object-contain"
               />
               Give a woodie !
            </Button>
            <Button @click.stop="addToCart" class="w-60">
               <FontAwesomeIcon icon="shopping-cart" class="mr-3 -ml-3" />Add to
               cart
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
