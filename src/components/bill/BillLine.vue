<script lang="ts">
   import Button from "../ui/button/Button.vue";

   export default {
      props: ["line"],
      components: { Button },
      watch: {
         line: {
            handler(newValue) {
               this.$emit("update-line", newValue);
            },
            deep: true,
         },
      },
      methods: {
         deleteLine() {
            this.$emit("delete-line");
         },
      },
   };
</script>

<template>
   <li>
      <input v-model="line.name" placeholder="Name" />
      <input v-model="line.description" placeholder="Description" />
      <input
         v-model.number="line.unitPrice"
         type="number"
         placeholder="Price"
      />
      <input
         v-model.number="line.quantity"
         type="number"
         placeholder="Quantity"
      />
      <select v-model="line.tva">
         <option value="5.5">5,5%</option>
         <option value="10">10%</option>
         <option value="20">20%</option>
      </select>
      <Button variant="destructive" @click="deleteLine">Delete</Button>
   </li>
</template>

<style scoped lang="scss">
   @import "@/css/variables.scss";
   li {
      width: 100%;
      display: grid;
      gap: 0.5rem;
      grid-template-columns: repeat(2, 1fr) repeat(2, 100px) 75px 150px;
      border: 1px solid $light-grey;
      border-radius: 8px;
   }

   input,
   select {
      padding-inline: 0.5rem;
      &:focus {
         border: 1.5px solid $secondary-color;
      }
   }

   input[type="number"] {
      text-align: center;
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
         -webkit-appearance: none;
         appearance: none;
         margin: 0;
      }
   }

   input::placeholder {
      color: $light-grey;
   }
</style>
