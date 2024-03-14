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
      name: "AlertDialogBill",
      props: {
         deleteAllLines: Function,
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
            This action cannot be undone. This will permanently delete all rows
         </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
         <AlertDialogCancel>Cancel</AlertDialogCancel>
         <AlertDialogAction @click="(deleteAllLines as () => void)">
            Delete all
         </AlertDialogAction>
      </AlertDialogFooter>
   </AlertDialogContent>
</template>
