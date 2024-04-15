<script lang="ts">
   import Header from "@/components/misc/Header.vue";
   import Toaster from "./components/ui/toast/Toaster.vue";

   export default {
      components: {
         Header,
         Toaster,
      },
   };
</script>

<template>
   <div class="flex flex-col min-h-screen">
      <Toaster />
      <Header />
      <router-view class="flex-1 w-full"></router-view>
   </div>
</template>
