<script lang="ts">
   export default {
      props: {
         rating: {
            type: Number,
            required: true,
         },
      },
   };
</script>

<template>
   <div class="">
      {{ Math.round(rating) }}
   </div>
</template>
