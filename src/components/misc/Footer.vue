<script>
   import { defineComponent } from "vue";

   export default defineComponent({});
</script>

<template>
   <footer
      class="fixed bottom-2 w-full text-end px-2"
      :class="{ 'text-white': this.$route.name === 'Home' }"
   >
      <p>&copy; 2024 Woodies Factory</p>
   </footer>
</template>
