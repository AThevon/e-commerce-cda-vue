<script setup lang="ts">
   import {
      Popover,
      PopoverContent,
      PopoverTrigger,
   } from "@/components/ui/popover";
   import ListItem from "@/components/misc/ListItem.vue";
</script>

<template>
   <Popover>
      <PopoverTrigger as-child>
         <slot />
      </PopoverTrigger>
      <PopoverContent class="w-80">
         <ul class="grid gap-4">
            <ListItem
               title="Account Informations"
               href="/user"
               description="View your profile"
               icon="user"
            >
               Modify your informations
            </ListItem>
            <ListItem
               title="Disconnect"
               href="/user"
               description="View your profile"
               icon="user"
            >
               Modify your informations
            </ListItem>
         </ul>
      </PopoverContent>
   </Popover>
</template>
