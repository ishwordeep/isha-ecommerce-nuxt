<template>
  <ULink
    class="border-default flex flex-col overflow-hidden rounded-lg border shadow-sm hover:shadow-md"
    to="/products/category/2"
    viewTransition
  >
    <NuxtImg src="https://picsum.photos/640/640?random=1" class="aspect-[4/3] object-fill" />
    <div class="flex flex-col gap-2 p-4">
      <span class="text-muted text-sm">Category</span>
      <span class="text-lg font-bold">Product</span>
      <div class="flex items-center gap-2">
        <span class="font-bold">Rs. 1234</span>
        <span class="text-muted text-sm line-through">Rs. 2345</span>
      </div>
    </div>
  </ULink>
</template>

<script setup lang="ts"></script>
