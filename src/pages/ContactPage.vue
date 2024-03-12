<script lang="ts">
   import Register from "@/components/Register.vue";

   export default {
      name: "ContactPage",
      components: {
         Register,
      },
   };
</script>

<template>
   <main>
      <Register />
   </main>
</template>

<style scoped lang="scss">
   @import "@/css/variables.scss";
</style>
