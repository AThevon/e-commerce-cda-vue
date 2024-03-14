import "./css/base.scss";
import "./css/index.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import fontawesome from "./plugins/fontawesome";
import { createPinia } from "pinia";

const app = createApp(App);

// Pinia
const pinia = createPinia();
app.use(pinia);

// Vue Router
app.use(router);

// Fon Awesome
app.use(fontawesome);


app.mount("#app");
