<script lang="ts">
   import { defineComponent } from "vue";
   import NavBar from "./NavBar.vue";
   import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
   import AccountPopover from "@/components/misc/AccountPopover.vue";
   import Button from "@/components/ui/button/Button.vue";

   export default defineComponent({
      components: {
         Button,
         NavBar,
         Avatar,
         AvatarImage,
         AvatarFallback,
         AccountPopover,
      },
      data() {
         return {
            isUserConnected: false,
         };
      },
      methods: {
         isActiveLink(route: string) {
            return this.$route.path === route;
         },
         toggleUserConnected() {
            this.isUserConnected = !this.isUserConnected;
         },
      },
   });
</script>

<template>
   <header
      class="bg-black2 relative text-white flex justify-between items-center px-12 h-20"
   >
      <h1
         class="font-main text-3xl font-bold uppercase"
         @click="toggleUserConnected"
      >
         Vue.js
      </h1>
      <nav>
         <NavBar />
      </nav>
      <div v-if="!isUserConnected" class="flex gap-4">
         <Button variant="secondary" as-child>
            <router-link to="/login">Login</router-link>
         </Button>
         <Button variant="secondary" as-child>
            <router-link to="/signin">Sign in</router-link>
         </Button>
      </div>
      <div v-else-if="isUserConnected" class="flex gap-4">
         <Avatar
            :class="
               isActiveLink('/cart')
                  ? 'outline outline-2 outline-offset-2 outline-white/90'
                  : ''
            "
         >
            <router-link
               to="/cart"
               class="w-full h-full flex items-center justify-center text-lg pr-[.2rem] pt-[.2rem] rounded-full"
            >
               <font-awesome-icon
                  icon="shopping-cart"
                  class="text-lg rounded-full"
               /> </router-link
         ></Avatar>
         <AccountPopover>
            <Avatar
               :class="
                  isActiveLink('/user')
                     ? 'outline outline-2 outline-offset-2 outline-white/90 '
                     : ''
               "
            >
               <font-awesome-icon icon="user" class="text-lg rounded-full" />
            </Avatar>
         </AccountPopover>
      </div>
   </header>
</template>

<style lang="scss">
   a.router-link-active {
      background-color: hsl(var(--white2)) !important;
      color: hsl(var(--black2)) !important;
   }
</style>
