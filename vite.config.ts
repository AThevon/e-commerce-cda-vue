import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

const pathToScssVariables = fileURLToPath(new URL("./src/css/variables.scss", import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
   css: {
      preprocessorOptions: {
         scss: {
           additionalData: `@import "${pathToScssVariables}";`
         }
       },
      postcss: {
         plugins: [tailwind(), autoprefixer()],
      },
   },
   plugins: [vue()],
   resolve: {
      alias: {
         "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
   },
});
