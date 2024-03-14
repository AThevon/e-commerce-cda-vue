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
   <div>
      <Toaster />
      <Header />
      <router-view></router-view>
   </div>
</template>
