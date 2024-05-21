<script lang="ts">
   export default {
      props: {
         containerClass: {
            type: String,
            default: "",
         },
         rating: {
            type: Number,
            required: true,
         },
      },
   };
</script>

<template>
   <div class="flex items-center gap-1" :class="containerClass">
      <span>{{ Math.round(rating) }}</span>
      <img
         src="/assets/icon-woodies.png"
         alt="Woodies"
         class="w-7 h-7 object-contain"
      />
   </div>
</template>
