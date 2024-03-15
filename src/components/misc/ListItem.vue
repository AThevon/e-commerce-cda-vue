<script setup lang="ts">
   import { cn } from "@/lib/utils";
   import { NavigationMenuLink } from "@/components/ui/navigation-menu";

   defineProps<{ title?: string; href?: string; isLink?: boolean }>();
</script>

<template>
   <li v-if="isLink">
      <NavigationMenuLink as-child>
         <a
            :href="href"
            :class="
               cn(
                  'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                  $attrs.class ?? ''
               )
            "
         >
            <div class="text-sm font-medium leading-none">{{ title }}</div>
            <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
               <slot />
            </p>
         </a>
      </NavigationMenuLink>
   </li>
   <li v-else>
      <div
         :class="
            cn(
               'block select-none space-y-1 rounded-md p-3 cursor-pointer leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
               $attrs.class ?? ''
            )
         "
      >
         <div class="text-sm font-medium leading-none">{{ title }}</div>
         <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
            <slot />
         </p>
      </div>
   </li>
</template>
