<script lang="ts">
   export default {
      props: ["totalHT", "tva"],
      computed: {
         getTotalTTC() {
            return this.totalHT + this.tva;
         },
      },
   };
</script>

<template>
   <div>
      <p>
         Total HT : <span>{{ totalHT.toFixed(2) }}</span>
      </p>
      <p>
         TVA : <span>{{ tva.toFixed(2) }}</span>
      </p>
      <p>
         Total TTC : <span>{{ getTotalTTC.toFixed(2) }}</span>
      </p>
   </div>
</template>

<style scoped lang="scss">
   @import "@/css/variables.scss";
   div {
      margin-top: 3rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 1rem;
      padding: 1rem;
      padding-right: 3rem;
      border: 1px solid $secondary-color;
      span {
         position: relative;
         color: $secondary-color;
         font-weight: 700;
         font-size: 1.2rem;
         &::after {
            content: "€";
            position: absolute;
            right: -.7rem;
            bottom: .1rem;
            font-size: 0.9rem;
            color: $secondary-color;
         }
      }
   }
</style>
