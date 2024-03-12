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
   <form @submit.prevent="submitForm">
      <ul>
         <li>
            <label for="firstname">First Name</label>
            <input
               id="firstname"
               v-model="user.firstname"
               type="text"
               required
               placeholder="Ex: John"
            />
         </li>
         <li>
            <label for="lastname">Last Name</label>
            <input
               id="lastname"
               v-model="user.lastname"
               type="text"
               required
               placeholder="Ex: Doe"
            />
         </li>
         <li>
            <label for="birthdate">Birthdate</label>
            <input
               id="birthdate"
               v-model="user.birthdate"
               type="date"
               required
            />
         </li>
         <li>
            <label for="username">Pseudo</label>
            <input
               id="username"
               v-model="user.username"
               type="text"
               required
               placeholder="Ex: JohnDoe37"
            />
         </li>
         <li>
            <label for="description">Description</label>
            <textarea
               id="description"
               v-model="user.description"
               rows="4"
               placeholder="Write your description here..."
            ></textarea>
         </li>
         <li>
            <label for="question">What's your favorite game ?</label>
            <select id="question" v-model="user.question">
               <option value="" disabled>Select a game</option>
               <option value="elden_ring">Elden Ring</option>
               <option value="apex_legends">Apex Legends</option>
               <option value="other">Other</option>
            </select>
         </li>
         <li class="checkbox">
            <input id="loveVue" type="checkbox" v-model="user.loveVue" />
            <label for="loveVue">Do you like Vue.js ?</label>
         </li>
         <li>
            <label for="password">Password</label>
            <input
               id="password"
               v-model="user.password"
               type="password"
               required
               placeholder="********"
            />
         </li>
         <li>
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

<style scoped lang="scss">
   @import "@/css/variables.scss";
   form {
      margin-block: 3rem;
      display: flex;
      flex-direction: column;
      max-width: 24rem;
      margin-inline: auto;
      ul {
         display: flex;
         flex-direction: column;
         gap: 1rem;
         margin-bottom: 2rem;
         li {
            display: flex;
            flex-direction: column;
            &.checkbox {
               flex-direction: row;
               align-items: center;
               label {
                  margin-bottom: 0;
                  cursor: pointer;
                  padding-left: 0.2rem;
                  user-select: none;
               }
            }
         }
      }
   }
</style>
