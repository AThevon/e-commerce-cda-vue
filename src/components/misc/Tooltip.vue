<script lang="ts">
   import { defineComponent } from "vue";
   import {
      Tooltip,
      TooltipContent,
      TooltipProvider,
      TooltipTrigger,
   } from "@/components/ui/tooltip";

   export default defineComponent({
      components: {
         Tooltip,
         TooltipContent,
         TooltipProvider,
         TooltipTrigger,
      },
      props: {
         content: {
            type: String,
            required: true,
         },
      },
   });
</script>

<template>
   <TooltipProvider>
      <Tooltip>
         <TooltipTrigger>
            <slot />
         </TooltipTrigger>
         <TooltipContent>
            <p>{{ content }}</p>
         </TooltipContent>
      </Tooltip>
   </TooltipProvider>
</template>
