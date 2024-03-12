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
   <slot>
      <div class="stars-container">
         <div class="stars-background">
            <span class="star" v-for="i in 5" :key="`bg-${i}`">★</span>
         </div>
         <div class="stars-foreground" :style="{ width: rating + '%' }">
            <span class="star" v-for="i in 5" :key="`fg-${i}`">★</span>
         </div>
         <span class="tooltip">{{ (rating * 5) / 100 }}/5</span>
      </div>
   </slot>
</template>

<style scoped lang="scss">
   .stars-container {
      margin-bottom: 1rem;
      margin-inline: auto;
      position: relative;
      width: calc(25px * 5);
      user-select: none;

      .stars-background ~ .stars-foreground {
         display: flex;
         position: absolute;
         top: 0;
         left: 0;
         overflow: hidden;
         width: 100%;
      }

      .star {
         color: #ccc;
         font-size: 25px;
      }

      .stars-foreground .star {
         color: gold;
      }

      .stars-foreground {
         overflow: hidden;
         white-space: nowrap;
      }

      .tooltip {
         position: absolute;
         top: 50%;
         left: 110%;
         transform: translateY(-50%) translateX(-100%) scale(0);
         font-size: 1rem;
         text-align: start;
         font-weight: 600;
         transition: all 0.3s ease;
      }

      &:hover .tooltip {
         transform: translateY(-50%) translateX(0) scale(1);
      }
   }
</style>
