<script lang="ts">
   import {
      Pagination,
      PaginationEllipsis,
      PaginationFirst,
      PaginationLast,
      PaginationList,
      PaginationListItem,
      PaginationNext,
      PaginationPrev,
   } from "@/components/ui/pagination";
   import { Button } from "@/components/ui/button";
   import { useProductStore } from "@/stores/useProductStore";

   export default {
      components: {
         Pagination,
         PaginationEllipsis,
         PaginationFirst,
         PaginationLast,
         PaginationList,
         PaginationListItem,
         PaginationNext,
         PaginationPrev,
         Button,
      },
      computed: {
         productStore() {
            return useProductStore();
         },
         totalProducts() {
            return this.productStore.products.length;
         },
         currentPage: {
            get() {
               return this.productStore.currentPage;
            },
            set(value: number) {
               this.productStore.setPage(value);
            },
         },
      },
   };
</script>

<template>
   <div>
      <Pagination
         v-model:page="currentPage"
         :total="totalProducts"
         :items-per-page="productStore.productsPerPage"
         :sibling-count="1"
         show-edges
      >
         <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationFirst />
            <PaginationPrev />

            <template v-for="(item, index) in items">
               <PaginationListItem
                  v-if="item.type === 'page'"
                  :key="index"
                  :value="item.value"
                  @click="currentPage = item.value"
               >
                  <Button
                     class="w-10 h-10 p-0"
                     :variant="
                        item.value === currentPage ? 'default' : 'outline'
                     "
                  >
                     {{ item.value }}
                  </Button>
               </PaginationListItem>
               <PaginationEllipsis v-else :key="item.type + index" />
            </template>

            <PaginationNext />
            <PaginationLast />
         </PaginationList>
      </Pagination>
   </div>
</template>
