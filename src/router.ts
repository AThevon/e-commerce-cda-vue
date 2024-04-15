import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/pages/NotFound.vue";
import HomePage from "@/pages/HomePage.vue";
import CustomOrderPage from "@/pages/CustomOrderPage.vue";
import ProductsPage from "@/pages/ProductsPage.vue";
import SingleProductPage from "@/pages/SingleProductPage.vue";
import BillPage from "@/pages/BillPage.vue";
import CartPage from "@/pages/CartPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import SignInPage from "@/pages/SignInPage.vue";

const routes = [
   { path: "/", name: "Home", component: HomePage },
   { path: "/products", name: "Products", component: ProductsPage },
   {
      path: "/products/:productId",
      name: "SingleProduct",
      component: SingleProductPage,
   },
  //  { path: "/bill", name: "Bill", component: BillPage },
   { path: "/custom-order", name: "CustomOrder", component: CustomOrderPage },
   { path: "/cart", name: "Cart", component: CartPage },
   { path: "/login", name: "Login", component: LoginPage },
   { path: "/signin", name: "signin", component: SignInPage },
   { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

export default router;
