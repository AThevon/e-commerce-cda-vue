<script lang="ts">
   import {
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
   } from "@/components/ui/alert-dialog";
   import { defineComponent } from "vue";

   export default defineComponent({
      name: "AlertDialogCart",
      props: {
         action: Function,
      },
      components: {
         AlertDialogAction,
         AlertDialogCancel,
         AlertDialogContent,
         AlertDialogDescription,
         AlertDialogFooter,
         AlertDialogHeader,
         AlertDialogTitle,
      },
   });
</script>

<template>
   <AlertDialogContent>
      <AlertDialogHeader>
         <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
         <AlertDialogDescription>
            This action cannot be undone. Do you want to continue ?
         </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
         <AlertDialogCancel>Cancel</AlertDialogCancel>
         <AlertDialogAction @click="(action as () => void)">
            Delete
         </AlertDialogAction>
      </AlertDialogFooter>
   </AlertDialogContent>
</template>

