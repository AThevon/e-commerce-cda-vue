import "./css/main.scss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import fontawesome from "./plugins/fontawesome";

createApp(App).use(router).use(fontawesome).mount("#app");
