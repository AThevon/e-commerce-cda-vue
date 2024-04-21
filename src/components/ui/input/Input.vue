<script setup lang="ts">
   import type { HTMLAttributes } from "vue";
   import { useVModel } from "@vueuse/core";
   import { cn } from "@/lib/utils";

   const props = defineProps<{
      defaultValue?: string | number;
      modelValue?: string | number;
      class?: HTMLAttributes["class"];
   }>();

   const emits = defineEmits<{
      (e: "update:modelValue", payload: string | number): void;
   }>();

   const modelValue = useVModel(props, "modelValue", emits, {
      passive: true,
      defaultValue: props.defaultValue,
   });
</script>

<template>
   <input
      v-model="modelValue"
      :class="
         cn(
            'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-opacity-50 transition-all duration-300 ease-in-out',
            props.class
         )
      "
   />
</template>
