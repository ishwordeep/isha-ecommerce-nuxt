<!-- components/ProductCard.vue -->
<template>
  <NuxtLink
    :to="`/products/${product.slug || product._id}`"
    class="group relative w-full cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-xl"
  >
    <!-- Image Container -->
    <div class="relative aspect-square w-full overflow-hidden bg-gray-50">
      <!-- Discount Badge -->
      <div v-if="product.discount > 0" class="absolute top-3 left-3 z-10">
        <UBadge color="error" variant="solid" size="sm" class="font-bold">
          -{{ product.discount }}%
        </UBadge>
      </div>

      <!-- Product Image / Emoji Placeholder -->
      <NuxtImg
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        width="400"
        height="400"
        format="webp"
      />
      <div class="h-full w-full bg-gray-200" v-else></div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <!-- Category -->
      <span
        v-if="product.category"
        class="mb-2 text-xs font-medium tracking-wider text-gray-500 uppercase"
      >
        {{ product.categoryDetails?.name }}
      </span>

      <!-- Name -->
      <h3 class="mb-1 line-clamp-1 font-semibold text-gray-900">
        <NuxtLink
          :to="`/products/${product.slug || product._id}`"
          class="hover:text-secondary transition-colors"
        >
          {{ product.name }}
        </NuxtLink>
      </h3>

      <!-- Price -->
      <div class="flex items-baseline gap-2">
        <span class="text-lg font-bold text-gray-900"> ${{ product.price.toFixed(2) }} </span>
        <!-- <span
          v-if="product.originalPrice > product.price"
          class="text-sm text-gray-400 line-through"
        >
          ${{ product.originalPrice.toFixed(2) }}
        </span> -->
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { ProductResponse } from '~/services/product.service'

const props = defineProps<{
  product: ProductResponse
  loading?: boolean
}>()
</script>
