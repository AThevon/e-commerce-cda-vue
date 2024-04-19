<script lang="ts">
   import { defineComponent } from "vue";
   import NavBar from "./NavBar.vue";
   import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
   import AccountPopover from "@/components/misc/AccountPopover.vue";
   import Button from "@/components/ui/button/Button.vue";
   import { useUserStore } from "@/stores/useUserStore";
   import { useCartStore } from "@/stores/useCartStore";
   import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

   export default defineComponent({
      components: {
         Button,
         NavBar,
         Avatar,
         AvatarImage,
         AvatarFallback,
         AccountPopover,
         FontAwesomeIcon,
      },
      computed: {
         userStore() {
            return useUserStore();
         },
         cartProducts() {
            return useCartStore().cartQuantity;
         },
         isLoggedIn() {
            return this.userStore.isLoggedIn;
         },
      },
      methods: {
         isActivePathStartsWith(route: string) {
            return this.$route.path.startsWith(route);
         },
         toggleLogin() {
            this.userStore.toggleLogin();
         },
      },
   });
</script>

<template>
   <header
      class="bg-black2 relative text-white flex justify-between items-center px-5 h-20"
   >
      <h1 class="font-main text-3xl font-bold uppercase" @click="toggleLogin">
         Woodies Factory
      </h1>
      <nav>
         <NavBar />
      </nav>
      <div v-if="!isLoggedIn" class="flex gap-4">
         <Button variant="secondary" as-child>
            <RouterLink to="/login">Login</RouterLink>
         </Button>
         <Button variant="secondary" as-child>
            <RouterLink to="/signin">Sign in</RouterLink>
         </Button>
      </div>
      <div v-else class="flex gap-4">
         <Avatar
            class="relative"
            :class="
               isActivePathStartsWith('/cart')
                  ? 'outline outline-2 outline-offset-2 outline-white/90'
                  : ''
            "
         >
            <RouterLink
               to="/cart"
               class="w-full h-full flex items-center justify-center text-lg pr-[.2rem] pt-[.2rem] rounded-full"
            >
               <span
                  class="scale-0 absolute w-2 h-2 flex justify-center items-center rounded-full -top-2 -right-2 p-3 text-sm font-bold bg-secondary text-primary-foreground transition-all duration-300 ease-out"
                  :class="{ 'scale-100': cartProducts > 0 }"
                  >{{ cartProducts }}</span
               >
               <FontAwesomeIcon
                  icon="shopping-cart"
                  class="text-lg rounded-full"
               /> </RouterLink
         ></Avatar>
         <AccountPopover>
            <Avatar
               :class="
                  isActivePathStartsWith('/user')
                     ? 'outline outline-2 outline-offset-2 outline-white/90 '
                     : ''
               "
            >
               <FontAwesomeIcon icon="user" class="text-lg rounded-full" />
            </Avatar>
         </AccountPopover>
      </div>
   </header>
</template>

<style lang="scss">
   a.RouterLink-active {
      background-color: hsl(var(--white2)) !important;
      color: hsl(var(--black2)) !important;
   }
</style>
