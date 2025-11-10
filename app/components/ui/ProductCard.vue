<template>
  <ULink
    class="border-default bg-tertiary flex flex-col overflow-hidden rounded-lg border text-black shadow-sm hover:shadow-md"
    to="/products/category/2"
    viewTransition
  >
    <!--    <NuxtImg :src="product.image" class="aspect-[4/3] object-fill" />-->
    <div class="item-image">{{ product.image }}</div>
    <div class="flex flex-col gap-2 p-4">
      <span class="text-muted text-sm">{{ product.category }}</span>
      <span class="text-lg font-bold">{{ product.name }}</span>
      <div class="flex items-center gap-2">
        <span class="font-bold">{{ product.price }}</span>
        <!--        <span class="text-muted text-sm line-through">$2345</span>-->
      </div>
    </div>
  </ULink>
</template>

<script setup lang="ts">
import type { Product } from '~/services/product.service'

defineProps<{
  product: Product
}>()
</script>

<style scoped></style>
