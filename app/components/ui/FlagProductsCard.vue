<template>
  <div
    class="group relative w-full overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:bg-[#F6F3E8] hover:shadow-md"
  >
    <!--Badge-->
    <div class="absolute top-4 left-4 z-10">
      <span
        class="flex items-center gap-1 rounded-full bg-gradient-to-r px-3 py-1 text-xs font-bold text-white shadow-md"
        :class="collection.gradient"
      >
        <UIcon name="i-lucide-sparkles" v-if="collection.type === 'newArrivals'" class="h-3 w-3" />
        {{ collection.badge }}
      </span>
    </div>

    <!--Wishlist Button-->
    <button
      class="absolute top-4 right-4 z-10 flex h-9 w-9 transform items-center justify-center rounded-full bg-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 hover:scale-110"
    >
      <UIcon name="i-lucide-heart" class="h-4 w-4 text-gray-600" />
    </button>

    <!--Product Image-->
    <div
      class="relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 min-[360px]:aspect-[4/3]"
    >
      <div class="text-8xl transition-transform duration-300 group-hover:scale-105">
        {{ product.image }}
      </div>
    </div>

    <!--Product Info-->
    <div class="p-5">
      <h3 class="mb-2 text-lg leading-tight font-bold text-gray-900">{{ product.name }}</h3>

      <!--Metadata Row-->
      <div class="mb-3 flex items-center gap-2">
        <span
          v-if="collection.type === 'newArrivals'"
          class="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600"
        >
          New
        </span>

        <span
          v-if="collection.type === 'trending'"
          class="flex items-center gap-1 rounded bg-orange-50 px-2 py-1 text-xs font-medium text-orange-600"
        >
          <!--                      <TrendingUp class="w-3 h-3" />-->
          Trending
        </span>
        <span
          v-if="collection.type === 'featured'"
          class="flex items-center gap-1 rounded bg-purple-50 px-2 py-1 text-xs font-medium text-purple-600"
        >
          <UIcon name="i-lucide-star" class="h-3 w-3 fill-current" />
          <!--                {{ product.rating }}-->
          4.9
        </span>
      </div>

      <!--Price and CTA-->
      <div class="flex items-center justify-between">
        <span class="text-lg font-bold text-gray-900 md:text-2xl">${{ product.price }}</span>
        <UButton
          icon="i-lucide-shopping-cart"
          :gradient="collection.gradient"
          class="flex h-10 w-10 items-center justify-center rounded-full p-0 opacity-0 shadow-lg group-hover:opacity-100"
        />
      </div>
    </div>
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    />
  </div>
</template>
<script setup lang="ts">
import type { Product } from '~/services/product.service'

defineProps<{
  product: Product
  collection: {
    title: string
    description: string
    gradient: string
    iconName?: string
    type: string
    badge: string
  }
}>()
</script>
