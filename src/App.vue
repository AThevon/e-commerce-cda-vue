<script lang="ts">
   import Header from "@/components/misc/Header.vue";
   import Toaster from "./components/ui/toast/Toaster.vue";
   import Footer from "@/components/misc/Footer.vue";

   export default {
      components: {
         Header,
         Toaster,
         Footer,
      },
   };
</script>

<template>
   <div class="flex flex-col min-h-screen">
      <Toaster />
      <Header />
      <router-view class="flex-1"></router-view>
      <Footer />
   </div>
</template>
