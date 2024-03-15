<script lang="ts">
   import { Button } from "@/components/ui/button";
   import { Input } from "@/components/ui/input";
   import { Label } from "@/components/ui/label";
   import {
      Sheet,
      SheetClose,
      SheetContent,
      SheetDescription,
      SheetFooter,
      SheetHeader,
      SheetTitle,
      SheetTrigger,
   } from "@/components/ui/sheet";
   import { defineComponent } from "vue";
   import Separator from "@/components/ui/separator/Separator.vue";

   export default defineComponent({
      components: {
         Button,
         Input,
         Label,
         Sheet,
         SheetClose,
         SheetContent,
         SheetDescription,
         SheetFooter,
         SheetHeader,
         SheetTitle,
         SheetTrigger,
         Separator,
      },
   });
</script>

<template>
   <Sheet>
      <SheetTrigger as-child>
         <slot />
      </SheetTrigger>
      <SheetContent>
         <SheetHeader>
            <SheetTitle>Change your password</SheetTitle>
            <SheetDescription>
               Make sure to use a strong password
            </SheetDescription>
         </SheetHeader>
         <div class="grid gap-4 py-4">
            <div class="flex flex-col gap-4">
               <Label for="oldPassword" class="ml-3"> Old Password </Label>
               <Input
                  id="oldPassword"
                  type="password"
                  value="Old Password"
                  class="col-span-3"
               />
            </div>
            <Separator
               class="bg-black/30 h-[.1rem] rounded-sm w-[80%] mx-auto"
            />
            <div class="flex flex-col gap-4">
               <Label for="newPassword" class="ml-3"> New Password </Label>
               <Input
                  id="newPassword"
                  type="password"
                  value="New password"
                  class="col-span-3"
               />
            </div>
            <div class="flex flex-col gap-4">
               <Label for="confirmNewPassword" class="ml-3">
                  Confirm New Password
               </Label>
               <Input
                  id="confirmNewPassword"
                  type="password"
                  value="Confirm new password"
                  class="col-span-3"
               />
            </div>
         </div>
         <SheetFooter>
            <SheetClose as-child>
               <Button type="submit"> Save changes </Button>
            </SheetClose>
         </SheetFooter>
      </SheetContent>
   </Sheet>
</template>
