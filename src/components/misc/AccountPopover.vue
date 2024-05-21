<script setup lang="ts">
   import {
      Popover,
      PopoverContent,
      PopoverTrigger,
   } from "@/components/ui/popover";
   import ListItem from "@/components/misc/ListItem.vue";
   import UserInfoSheet from "@/components/misc/UserInfoSheet.vue";
</script>

<template>
   <Popover>
      <PopoverTrigger as-child>
         <slot />
      </PopoverTrigger>
      <PopoverContent class="w-50 mt-2 mr-6">
         <ul class="grid gap-0">
            <ListItem
               title="My Profile"
               isLink
               href="/profile"
               description="View your profile"
            />
            <UserInfoSheet>
               <ListItem
                  title="Change Password"
                  description="Change your password"
               />
            </UserInfoSheet>
            <ListItem
               title="Disconnect"
               description="Disconnect from your account"
               class="text-destructive hover:text-destructive"
               @click="console.log('disconnect')"
            />
         </ul>
      </PopoverContent>
   </Popover>
</template>
