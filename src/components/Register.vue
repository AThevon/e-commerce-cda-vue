<script lang="ts">
   import { defineComponent } from "vue";

   export default defineComponent({
      data() {
         return {
            user: {
               firstname: "",
               lastname: "",
               birthdate: "",
               username: "",
               description: "",
               question: "",
               loveVue: false,
               password: "",
            },
            confirmPassword: "",
         };
      },
      methods: {
         submitForm() {
            if (this.user.password !== this.confirmPassword) {
               alert("Passwords are different.");
               return;
            }

            alert(`
         Resume:
         First name : ${this.user.firstname}
         Last name: ${this.user.lastname}
         Birthdate: ${this.user.birthdate}
         Pseudo: ${this.user.username}
         Description: ${this.user.description}
         Favorite Video Game: ${this.user.question}
         Do you like Vue.js ? ${this.user.loveVue ? "Oui" : "Non"}
         Password: ${this.user.password}
       `);
         },
      },
   });
</script>

<template>
   <form @submit.prevent="submitForm" class="mx-auto my-12 max-w-md">
      <ul class="flex flex-col gap-4 mb-8">
         <li class="flex flex-col">
            <label for="firstname">First Name</label>
            <input
               id="firstname"
               v-model="user.firstname"
               type="text"
               required
               placeholder="Ex: John"
            />
         </li>
         <li class="flex flex-col">
            <label for="lastname">Last Name</label>
            <input
               id="lastname"
               v-model="user.lastname"
               type="text"
               required
               placeholder="Ex: Doe"
            />
         </li>
         <li class="flex flex-col">
            <label for="birthdate">Birthdate</label>
            <input
               id="birthdate"
               v-model="user.birthdate"
               type="date"
               required
            />
         </li>
         <li class="flex flex-col">
            <label for="username">Pseudo</label>
            <input
               id="username"
               v-model="user.username"
               type="text"
               required
               placeholder="Ex: JohnDoe37"
            />
         </li>
         <li class="flex flex-col">
            <label for="description">Description</label>
            <textarea
               id="description"
               v-model="user.description"
               rows="4"
               placeholder="Write your description here..."
            ></textarea>
         </li>
         <li class="flex flex-col">
            <label for="question">What's your favorite game ?</label>
            <select id="question" v-model="user.question">
               <option value="" disabled>Select a game</option>
               <option value="elden_ring">Elden Ring</option>
               <option value="apex_legends">Apex Legends</option>
               <option value="other">Other</option>
            </select>
         </li>
         <li class="flex-row items-center">
            <input id="loveVue" type="checkbox" v-model="user.loveVue" />
            <label for="loveVue" class="mb-0 cursor-pointer pl-1 select-none"
               >Do you like Vue.js ?</label
            >
         </li>
         <li class="flex flex-col">
            <label for="password">Password</label>
            <input
               id="password"
               v-model="user.password"
               type="password"
               required
               placeholder="********"
            />
         </li>
         <li class="flex flex-col">
            <label for="confirmPassword">Confirm password</label>
            <input
               id="confirmPassword"
               v-model="confirmPassword"
               type="password"
               required
               placeholder="********"
            />
         </li>
      </ul>
      <button type="submit">Subscribe</button>
   </form>
</template>
