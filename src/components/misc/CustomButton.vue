<script lang="ts">
   import { defineComponent } from "vue";
   import type { PropType } from "vue";
   import { RouterLink } from "vue-router";

   export default defineComponent({
      name: "CustomButton",
      props: {
         to: {
            type: [String, Object] as any,
            default: undefined,
         },
         isRouterLink: {
            type: Boolean,
            default: false,
         },
         isLink: {
            type: Boolean,
            default: false,
         },
         isSecondary: {
            type: Boolean,
            default: false,
         },
      },
   });
</script>

<template>
   <div :class="{ secondary: isSecondary }">
      <router-link v-if="isRouterLink" :to="(to as any)">
         <slot></slot>
      </router-link>
      <a v-else-if="isLink" :href="(to as any)">
         <slot></slot>
      </a>
      <button v-else>
         <slot></slot>
      </button>
   </div>
</template>

<style scoped lang="scss">
   @import "@/css/variables.scss";
   button {
      padding: 1rem 2rem;
   }
   a {
      padding: 1rem 2rem;
      font-weight: 700;
   }

   button,
   .button {
      width: fit-content;
      margin-inline: auto;
      display: grid;
      place-items: center;
      cursor: pointer;
      border-radius: 8px;
      font-weight: bold;
      letter-spacing: 5px;
      text-transform: uppercase;
      color: $white;
      text-align: center;
      transition: all 0.5s;
      font-size: 15px;
      font-weight: 700;
      position: relative;
      overflow: hidden;
      background-color: $black2;
      &:hover {
         color: $white;
         transform: scale(1.02);
         box-shadow: 4px 5px 17px -4px $primary-color;
         &::before {
            width: 250%;
         }
      }
      &::before {
         content: "";
         position: absolute;
         left: -50px;
         top: 0;
         width: 0;
         height: 100%;
         background-color: $primary-color;
         transform: skewX(45deg);
         z-index: -1;
         transition: width 0.5s;
         cursor: pointer;
      }
      &:active {
         transform: scale(1);
         box-shadow: 0 0 0 0 $primary-color;
      }
   }
   .secondary {
      button,
      .button {
         &:hover {
            box-shadow: 4px 5px 17px -4px $secondary-color;
         }
         &::before {
            background-color: $secondary-color;
         }
         &:active {
            box-shadow: 0 0 0 0 $secondary-color;
         }
      }
   }
</style>
