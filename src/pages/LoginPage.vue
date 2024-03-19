<script setup lang="ts">
   import { useForm } from "vee-validate";
   import { toTypedSchema } from "@vee-validate/zod";
   import * as z from "zod";
   import { vAutoAnimate } from "@formkit/auto-animate/vue";

   import { Button } from "@/components/ui/button";
   import {
      FormControl,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
   } from "@/components/ui/form";
   import { Input } from "@/components/ui/input";
   import { toast } from "@/components/ui/toast";

   const formSchema = toTypedSchema(
      z.object({
         email: z.string().email(),
         password: z.string().min(6),
      })
   );

   const { handleSubmit } = useForm({
      validationSchema: formSchema,
   });

   const onSubmit = handleSubmit((values) => {
      toast({
         title: "You submitted the following values:",
      });
   });
</script>

<template>
   <div class="flex flex-col gap-8 mx-auto mt-40 w-1/3">
      <form class="w-full space-y-4" @submit="onSubmit">
         <FormField v-slot="{ componentField }" name="email">
            <FormItem v-auto-animate>
               <FormLabel>Email</FormLabel>
               <FormControl>
                  <Input
                     type="text"
                     placeholder="name@example.com"
                     v-bind="componentField"
                     auto-capitalize="none"
                     auto-complete="email"
                     auto-correct="off"
                     :disabled="false"
                  />
               </FormControl>
               <FormMessage />
            </FormItem>
         </FormField>
         <FormField v-slot="{ componentField }" name="password">
            <FormItem v-auto-animate>
               <FormLabel>Password</FormLabel>
               <FormControl>
                  <Input
                     type="password"
                     placeholder="********"
                     v-bind="componentField"
                  />
               </FormControl>
               <FormMessage />
            </FormItem>
         </FormField>
         <Button
            variant="secondary"
            :disabled="false"
            type="submit"
            class="w-full"
         >
            <font-awesome-icon
               icon="spinner"
               v-if="false"
               class="mr-2 h-4 w-4 animate-spin"
            />
            Login with Email
         </Button>
      </form>
      <div class="relative">
         <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t" />
         </div>
         <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-background px-2 text-muted-foreground">
               Or continue with
            </span>
         </div>
      </div>
      <Button type="button" class="w-full" as-child :disabled="false">
         <router-link to="/google">
            <font-awesome-icon
               icon="spinner"
               v-if="false"
               class="mr-2 h-4 w-4 animate-spin"
            />
            <img v-else src="" class="mr-2 h-4 w-4" />
            Google
         </router-link>
      </Button>
   </div>
</template>
