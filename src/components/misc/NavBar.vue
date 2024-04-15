+
<script lang="ts">
   import { defineComponent } from "vue";
   import ListItem from "@/components/misc/ListItem.vue";
   import {
      NavigationMenu,
      NavigationMenuContent,
      NavigationMenuItem,
      NavigationMenuLink,
      NavigationMenuList,
      NavigationMenuTrigger,
      navigationMenuTriggerStyle,
   } from "@/components/ui/navigation-menu";

   export default defineComponent({
      components: {
         NavigationMenu,
         NavigationMenuContent,
         NavigationMenuItem,
         NavigationMenuLink,
         NavigationMenuList,
         NavigationMenuTrigger,
         ListItem,
      },
      data() {
         return {
            productLinks: [
               {
                  title: "All Products",
                  href: "/products",
                  description: "Create a new product",
                  icon: "https://www.radix-vue.com/logo.svg",
                  grid: "row-span-3",
               },
               {
                  title: "Totems",
                  href: "/products",
                  description: "Simply elegant",
                  icon: "https://www.radix-vue.com/logo.svg",
                  grid: "row-span-1",
               },
               {
                  title: "LEDs",
                  href: "/products",
                  description: "Bring light to your life",
                  icon: "https://www.radix-vue.com/logo.svg",
                  grid: "row-span-3",
               },
               {
                  title: "Frames",
                  href: "/products",
                  description: "The best frames",
                  icon: "https://www.radix-vue.com/logo.svg",
                  grid: "row-span-3",
               },
               {
                  title: "Plaque",
                  href: "/products",
                  description: "Your walls will thank you",
                  icon: "https://www.radix-vue.com/logo.svg",
                  grid: "row-span-2",
               },
            ],
            customOrderElements: [
               {
                  title: "New",
                  href: "/custom-order",
                  description: "Create a new custom order",
               },
               {
                  title: "Showcase",
                  href: "/custom-orders-showcase",
                  description: "Browse custom orders made by others",
               },
            ],
            navigationMenuTriggerStyle,
         };
      },
      methods: {
         isActivePath(href: string) {
            return this.$route.path === href;
         },
         isActivePathStartsWith(href: string) {
            return this.$route.path.startsWith(href);
         },
      },
   });
</script>

<template>
   <NavigationMenu>
      <NavigationMenuList>
         <NavigationMenuItem>
            <NavigationMenuLink
               :active="isActivePath('/')"
               href="/"
               :class="navigationMenuTriggerStyle()"
            >
               Home
            </NavigationMenuLink>
         </NavigationMenuItem>
         <NavigationMenuItem>
            <NavigationMenuTrigger
               :class="
                  isActivePathStartsWith('/products')
                     ? 'bg-accent text-accent-foreground'
                     : null
               "
            >
               Products
            </NavigationMenuTrigger>
            <NavigationMenuContent>
               <ul
                  class="grid gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]"
               >
                  <li
                     v-for="productLink in productLinks"
                     :class="productLink.grid"
                  >
                     <NavigationMenuLink as-child>
                        <a
                           class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                           :href="productLink.href"
                        >
                           <img :src="productLink.icon" class="h-6 w-6" />
                           <div class="mb-2 mt-4 text-lg font-medium">
                              {{ productLink.title }}
                           </div>
                           <p
                              class="text-sm leading-tight text-muted-foreground"
                           >
                              {{ productLink.description }}
                           </p>
                        </a>
                     </NavigationMenuLink>
                  </li>
               </ul>
            </NavigationMenuContent>
         </NavigationMenuItem>
         <NavigationMenuItem>
            <NavigationMenuTrigger
               :class="
                  isActivePathStartsWith('/custom-order')
                     ? 'bg-accent text-accent-foreground'
                     : null
               "
               >Custom Order</NavigationMenuTrigger
            >
            <NavigationMenuContent>
               <ul class="flex flex-col w-[400px] gap-3 p-4">
                  <ListItem
                     v-for="element in customOrderElements"
                     :key="element.title"
                     :title="element.title"
                     :href="element.href"
                     isLink
                  >
                     {{ element.description }}
                  </ListItem>
               </ul>
            </NavigationMenuContent>
         </NavigationMenuItem>
      </NavigationMenuList>
   </NavigationMenu>
</template>
