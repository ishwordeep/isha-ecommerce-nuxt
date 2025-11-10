<template>
  <div
    class="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-xl"
  >
    <!-- Product Image -->
    <NuxtLink :to="`/products/${product.category?.name || 'category'}/${product._id}`">
      <div
        class="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <div class="text-6xl transition-transform duration-300 group-hover:scale-105">
          {{ product.image }}
        </div>

        <!-- Category Badge -->
        <div class="absolute top-3 left-3">
          <span
            class="rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm"
          >
            {{ product.category?.name }}
          </span>
        </div>
      </div>
    </NuxtLink>

    <!-- Product Info -->
    <div class="p-4">
      <h3 class="mb-2 line-clamp-2 text-sm leading-tight font-bold text-gray-900">
        <NuxtLink
          :to="`/products/${product.category?.name || 'category'}/${product._id}`"
          class="transition-colors hover:text-indigo-600"
        >
          {{ product.name }}
        </NuxtLink>
      </h3>
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold text-gray-900">${{ product.price.toFixed(2) }}</span>
        <span
          class="group:hover:translate-x-0 flex translate-x-2 items-center gap-1 text-xs font-medium text-blue-600 opacity-0 opacity-100 transition-all duration-300"
          @click="navigateTo(`/products/${product.category?.name || 'category'}/${product._id}`)"
        >
          View
          <UIcon name="i-lucide-arrow-right" class="h-3 w-3" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/services/product.service'

defineProps<{
  product: Product
}>()

const wishlisted = ref(false)

const addToWishlist = () => {
  wishlisted.value = !wishlisted.value
  // Connect to Pinia store in real app
}

const addToCart = (product: Product) => {
  // Emit or use cart store
  console.log('Added to cart:', product._id)
}
</script>
