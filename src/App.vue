<script lang="ts">
   import Header from "@/components/misc/Header.vue";

   export default {
      components: {
         Header,
      },
   };
</script>

<template>
   <div>
      <Header />
      <router-view></router-view>
   </div>
</template>
