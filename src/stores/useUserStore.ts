import { defineStore } from "pinia";
import * as api from "@/api";
import type { UserType } from "@/types/UserType";

export const useUserStore = defineStore("user", {
   state: () => ({
      user: null,
      isLoggedIn: false,
   }),
   actions: {
      toggleLogin() {
         this.isLoggedIn = !this.isLoggedIn;
      },
      async login(credentials: {
         email: UserType["email"];
         password: UserType["password"];
      }) {
         try {
            const user = await api.post("/login", credentials);
            this.user = user;
            this.isLoggedIn = true;
            localStorage.setItem("token", user.token);
         } catch (error) {
            console.error("Login failed:", error);
            throw error;
         }
      },
      async logout() {
         try {
            await api.postWithoutBody("/logout");
            this.user = null;
            this.isLoggedIn = false;
            localStorage.removeItem("token");
         } catch (error) {
            console.error("Logout failed:", error);
            throw error;
         }
      },
      async fetchUser() {
         try {
            const user = await api.get("/user");
            this.user = user;
         } catch (error) {
            console.error("Fetch user failed:", error);
         }
      },
   },
});
