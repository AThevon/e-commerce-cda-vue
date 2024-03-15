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
   <div
      class="mt-12 flex flex-col items-end gap-4 p-4 pr-12 border border-secondary"
   >
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
   span {
      position: relative;
      color: hsl(var(--secondary));
      font-weight: 700;
      font-size: 1.2rem;
      &::after {
         content: "€";
         position: absolute;
         right: -0.7rem;
         bottom: 0.1rem;
         font-size: 0.9rem;
         color: hsl(var(--secondary));
      }
   }
</style>
