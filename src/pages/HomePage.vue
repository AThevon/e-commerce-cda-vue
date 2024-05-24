<script lang="ts">
   export default {
      name: "HomePage",
   };
</script>

<template>
   <main class="relative">
      <img rel="preload" src="/assets/hero.png" alt="" class="-z-20 absolute top-0 left-0 w-full h-full object-cover" />
      <span class="-z-10 absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/50 to-black/0"></span>
      <div class="container mx-auto h-[60vh] flex flex-col justify-center px-4">
         <h1 class="text-4xl p-4 bg-white w-fit rounded-xl font-bold font-main mt-4">
            Woodies Factory
         </h1>
         <p class="text-lg mt-4 text-white font-semibold font-sans">
            Welcome to the Woodies Factory, <br/> where we make the best wooden furniture in the world.
         </p>
      </div>
   </main>
</template>
