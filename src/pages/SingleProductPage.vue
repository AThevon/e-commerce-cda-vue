<script lang="ts">
   import { defineComponent } from "vue";
   import type { ProductType } from "@/types/ProductType";
   import Ratings from "@/components/products/Ratings.vue";
   import { Button } from "@/components/ui/button";
   import AspectRatio from "@/components/ui/aspect-ratio/AspectRatio.vue";

   export default defineComponent({
      name: "SingleProductPage",
      components: {
         Button,
         Ratings,
         AspectRatio,
      },
      data() {
         return {
            product: {} as ProductType,
            products: [] as ProductType[],
         };
      },
      watch: {
         "$route.params.productId": {
            immediate: true,
            handler(newId: string) {
               this.loadProduct(newId);
            },
         },
      },
      methods: {
         fetchProductData() {
            fetch("/data/products.json")
               .then((response) => response.json())
               .then((data) => {
                  let productData = data;
                  this.products = productData;
                  this.loadProduct(this.$route.params.productId as string);
               })
               .catch((error) =>
                  console.error("Error fetching the local json:", error)
               );
         },
         loadProduct(id: string) {
            if (this.products.length === 0) return;
            this.product =
               this.products.find((p) => String(p.id) === id) ??
               ({} as ProductType);
         },
         navigateToProduct(direction: string) {
            const currentIndex = this.products.findIndex(
               (p) => String(p.id) === this.$route.params.productId
            );
            let newIndex =
               direction === "next" ? currentIndex + 1 : currentIndex - 1;

            // Looping system
            if (newIndex >= this.products.length) {
               newIndex = 0;
            } else if (newIndex < 0) {
               newIndex = this.products.length - 1;
            }

            const newId = this.products[newIndex].id;
            this.$router.push({
               name: "SingleProduct",
               params: { productId: newId },
            });
         },
      },
      computed: {
         rating() {
            if (!this.product) return 0;
            return (this.product.rating / 5) * 100;
         },
      },
      mounted() {
         this.fetchProductData();
      },
   });
</script>

<template>
   <div>
      <div class="title-container">
         <Button as-child>
            <router-link :to="{ name: 'Products' }">Back</router-link>
         </Button>
         <h2>{{ product.name }}</h2>
      </div>
      <Button
         size="icon"
         class="absolute top-1/2 transform -translate-y-1/2 rounded-md text-lg font-bold py-6 px-8 left-20 transition-all duration-300 hover:py-7 hover:px-9 hover:left-[4.3rem]"
         @click="navigateToProduct('previous')"
      >
         <font-awesome-icon icon="arrow-left" />
      </Button>
      <Button
         size="icon"
         class="absolute top-1/2 transform -translate-y-1/2 rounded-md text-lg font-bold py-6 px-8 right-20 transition-all duration-300 hover:py-7 hover:px-9 hover:right-[4.3rem]"
         @click="navigateToProduct('next')"
      >
         <font-awesome-icon icon="arrow-right" />
      </Button>
      <div class="main-container">
         <div class="w-[45rem]">
            <AspectRatio :ratio="4 / 3">
               <img :src="product.image" :alt="product.name" class="w-full h-full object-cover shadow-lg rounded-md" />
            </AspectRatio>
         </div>
         <div class="desc-container">
            <h3 class="text-3xl font-main">{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <p class="price">{{ product.unit_price }}€</p>
            <Ratings :rating="rating" />
            <Button as-child>
               <router-link :to="{ name: 'Cart' }">Add to cart</router-link>
            </Button>
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
   @import "@/css/variables.scss";
   .title-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-block: 2rem;
      padding-inline: 3rem;
      h2 {
         text-align: center;
         font-weight: 700;
         font-size: 1.4rem;
         text-transform: uppercase;
      }
   }
   .main-container {
      position: relative;
      height: 70vh;
      margin-inline: 10rem;
      display: flex;
      justify-content: space-between;
      padding: 7rem 4rem;
      border-radius: 0.5rem;
      background-color: $white;
      overflow: hidden;
      &::before {
         content: "";
         position: absolute;
         top: -90%;
         left: -50%;
         transform: rotate(-45deg);
         width: 200%;
         height: 120%;
         background-color: $light-grey;
         border-radius: 0.5rem;
      }
      div {
         display: flex;
         flex-direction: column;
         justify-content: center;
         z-index: 10;
         &.desc-container {
            justify-content: flex-end;
            align-items: flex-end;
            gap: 1rem;
            text-align: end;
            p {
               font-size: 1.2rem;
               &.price {
                  font-size: 1.6rem;
                  font-weight: 700;
               }
            }
         }
      }
   }
</style>
