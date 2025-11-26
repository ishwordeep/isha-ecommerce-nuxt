<template>
  <div>
    <!-- Empty State -->
    <div
      v-if="wishlistItems.length === 0"
      class="rounded-xl border border-gray-200 bg-white p-4 text-center"
    >
      <UIcon name="i-heroicons-heart-20-solid" class="mx-auto mb-4 h-16 w-16 text-gray-300" />
      <h3 class="mb-2 text-xl font-semibold text-gray-900">Your wishlist is empty</h3>
      <p class="mb-6 text-gray-600">Start adding items you love!</p>
      <UButton to="/products" color="primary" size="lg"> Browse Products </UButton>
    </div>

    <!-- Wishlist Grid -->
    <div
      v-else
      class="grid grid-cols-1 gap-6 min-[370px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div
        v-for="product in wishlistItems"
        class="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-xl"
      >
        <!-- Product Image -->
        <NuxtLink :to="`/products/${product.id}`">
          <div
            class="relative flex aspect-square items-center justify-center overflow-hidden bg-linear-to-br from-gray-50 to-gray-100"
          >
            <!--        <div class="text-6xl transition-transform duration-300 group-hover:scale-105">-->
            <!--          {{ product.image }}-->
            <!--        </div>-->
            <NuxtImg
              v-if="product.image"
              :src="product.image || '/images/placeholder.png'"
              alt="Product Image"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              width="400"
              height="300"
              priority
            />

            <USkeleton v-else class="h-full w-full" />

            <UButton
              square
              size="xs"
              class="absolute top-2 right-2 z-10"
              icon="i-lucide-trash-2"
              color="error"
              variant="subtle"
            />
          </div>
        </NuxtLink>

        <!-- Product Info -->
        <div class="p-4">
          <h3 class="mb-2 line-clamp-1 text-sm leading-tight font-bold text-gray-900">
            <NuxtLink
              :to="`/products/${product.id}`"
              class="transition-colors hover:text-indigo-600"
            >
              {{ product.name }}
            </NuxtLink>
          </h3>
          <div class="flex items-center justify-between">
            <span class="text-xl font-bold text-gray-900">${{ product.price.toFixed(2) }}</span>
          </div>
          <UButton
            square
            size="sm"
            label="Add to Cart"
            class="mt-2 w-full justify-center"
            leading-icon="i-lucide-shopping-cart"
            color="secondary"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart.store'

const cartStore = useCartStore()

// Static data (same as your React version)
const wishlistItems = computed(() => {
  // Safety first: check if cartStore.carts exists and is an array
  if (!cartStore.carts || !Array.isArray(cartStore.carts)) {
    return []
  }

  return cartStore.carts.map((item) => ({
    id: item.productId, // fallback if field name differs
    name: item.name || 'Unnamed Product',
    price: Number(item.price) || 0,
    image: item.image || '', // emoji or fallback image URL
  }))
})
</script>
