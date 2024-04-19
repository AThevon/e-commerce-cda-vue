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
         email: z.string().email("Invalid email address"),
         first_name: z.string().min(1, "Please enter your first name"),
         last_name: z.string().min(1, "Please enter your last name"),
         password: z.string().min(6, "Password must be at least 6 characters"),
      })
   );

   const { handleSubmit, isSubmitting } = useForm({
      validationSchema: formSchema,
   });

   const onSubmit = handleSubmit(async (values) => {
      try {
         // API call ici
         console.log("Submitted values:", values);
         toast({
            title: "Registration successful!",
            description: "You've been successfully registered.",
         });
      } catch (error) {
         toast({
            title: "Error registering",
            description: "There was an error during registration.",
         });
      }
   });
</script>

<template>
   <div class="flex flex-col gap-3 mx-auto mt-40 w-[20rem]">
      <h1 class="text-3xl font-bold text-center uppercase">Register</h1>
      <form class="w-full space-y-4" @submit="onSubmit">
         <FormField v-slot="{ componentField }" name="email">
            <FormItem v-auto-animate>
               <FormLabel>Email</FormLabel>
               <FormControl>
                  <Input
                     type="email"
                     placeholder="name@example.com"
                     v-bind="componentField"
                     :disabled="isSubmitting"
                  />
               </FormControl>
               <FormMessage />
            </FormItem>
         </FormField>
         <FormField v-slot="{ componentField }" name="first_name">
            <FormItem v-auto-animate>
               <FormLabel>First Name</FormLabel>
               <FormControl>
                  <Input
                     type="text"
                     placeholder="John"
                     v-bind="componentField"
                     :disabled="isSubmitting"
                  />
               </FormControl>
               <FormMessage />
            </FormItem>
         </FormField>
         <FormField v-slot="{ componentField }" name="last_name">
            <FormItem v-auto-animate>
               <FormLabel>Last Name</FormLabel>
               <FormControl>
                  <Input
                     type="text"
                     placeholder="Doe"
                     v-bind="componentField"
                     :disabled="isSubmitting"
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
                     :disabled="isSubmitting"
                  />
               </FormControl>
               <FormMessage />
            </FormItem>
         </FormField>
         <Button
            variant="secondary"
            :disabled="isSubmitting"
            type="submit"
            class="w-full"
         >
            Register
         </Button>
      </form>
      <RouterLink
         to="/login"
         class="group relative text-center text-sm mt-2 w-[70%] mx-auto active:scale-95 transition-all duration-200 ease-in-out"
      >
         Already have an account ? <strong>Login</strong>
         <span
            class="absolute left-1/2 bottom-[-1px] -translate-x-1/2 bg-red/.2 border-b-2 w-0 border-black group-hover:w-[90%] h-full transition-all duration-200 ease-in-out"
         ></span>
      </RouterLink>
   </div>
</template>
