<script lang="ts">
   export default {
      props: {
         rating: {
            type: Number,
            required: true,
         },
      },
      methods: {
         getRating() {
            if (this.rating === 0) return 0;
            let roundedRating = ((Math.round(this.rating * 10) / 10) * 5) / 100;
            return roundedRating;
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
         <div
            class="stars-foreground"
            :style="{ width: getRating() * 20 + '%' }"
         >
            <span class="star" v-for="i in 5" :key="`fg-${i}`">★</span>
         </div>
         <span class="tooltip">{{ getRating() }}/5</span>
      </div>
   </slot>
</template>

<style scoped lang="scss">
   .stars-container {
      width: 100%;
      margin-bottom: 1rem;
      position: relative;
      width: calc(20.84px * 5);
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
         right: 110%;
         transform: translateY(-50%) translateX(100%) scale(0);
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
