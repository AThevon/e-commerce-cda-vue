<script lang="ts">
   import { defineComponent } from "vue";
   import CustomButton from "@/components/misc/CustomButton.vue";
   import type { ProductType } from "@/types/ProductType";
   import Ratings from "@/components/products/Ratings.vue";

   export default defineComponent({
      name: "SingleProductPage",
      components: {
         CustomButton,
         Ratings,
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
         <CustomButton :isRouterLink="true" :to="'/products'" class="button"
            >Back</CustomButton
         >
         <h2>{{ product.name }}</h2>
      </div>
      <CustomButton
         @click="navigateToProduct('previous')"
         class="button arrow left"
      >
         <font-awesome-icon icon="arrow-left" />
      </CustomButton>
      <CustomButton
         @click="navigateToProduct('next')"
         class="button arrow right"
      >
         <font-awesome-icon icon="arrow-right" />
      </CustomButton>
      <div class="main-container">
         <div class="img-container">
            <img :src="product.image" :alt="product.name" />
         </div>
         <div class="desc-container">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <p class="price">{{ product.unit_price }}€</p>
            <Ratings :rating="rating" />
            <CustomButton :isRouterLink="true" :to="'/cart'" class="button"
               >Add to cart
            </CustomButton>
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
      .button {
         margin: 0;
      }
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
         top: -70%;
         right: -80%;
         transform: rotate(25deg);
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
         &.img-container {
            img {
               height: 100%;
               object-fit: contain;
               border-radius: 0.5rem;
               box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
            }
         }
         &.desc-container {
            justify-content: flex-end;
            align-items: flex-end;
            gap: 1rem;
            text-align: end;
            h3 {
               font-size: 1.8rem;
               font-weight: 700;
            }
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
   .arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 5rem;
      height: 4rem;
      border-radius: 0.5rem;
      font-size: 1.2rem;
      font-weight: 700;
      &.left {
         left: 3rem;
      }
      &.right {
         right: 3rem;
      }
   }
</style>
