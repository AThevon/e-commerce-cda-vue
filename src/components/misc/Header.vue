<template>
   <header>
      <h1>Vue.js</h1>
      <nav>
         <ul>
            <li>
               <router-link to="/">Home</router-link>
            </li>
            <li>
               <router-link to="/products">Products</router-link>
            </li>
            <li>
               <router-link to="/bill">Bill</router-link>
            </li>
            <li>
               <router-link to="/contact">Contact</router-link>
            </li>
         </ul>
      </nav>
   </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
   @import "@/css/variables.scss";
   header {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-inline: 3rem;
      height: 5rem;
      background-color: $black2;
      color: $white;
      h1 {
         font-size: 1.8rem;
         font-weight: 700;
         text-transform: uppercase;
      }
      nav ul {
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         display: flex;
         gap: 0.5rem;
         li {
            a {
               padding: 1rem 2rem;
               border-radius: 15px;
               font-weight: 600;
               letter-spacing: 2px;
               text-transform: uppercase;
               font-size: 0.9rem;
               transition: all 0.2s ease;
            }
            a:hover,
            a.router-link-active {
               background-color: $white2;
               color: $black2;
            }
            a:not(.router-link-active):hover {
               background-color: $light-grey;
            }
         }
      }
   }
</style>
