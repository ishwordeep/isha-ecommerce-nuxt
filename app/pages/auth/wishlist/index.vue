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
        v-for="item in wishlistItems"
        :key="item.id"
        class="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <!-- Image Container -->
        <div
          class="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 transition duration-500"
          @click="navigateTo(`/products/${item.id}`)"
        >
          <NuxtImg
            :src="item.image"
            :alt="item.name"
            v-if="item.image"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <!-- Content -->
        <div class="p-5">
          <h3
            class="line-clamp-1 text-base font-bold text-gray-900"
            @click="navigateTo(`/products/${item.id}`)"
          >
            {{ item.name }}
          </h3>

          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-2xl font-bold text-gray-900"> ${{ item.price.toFixed(2) }} </span>
            <!-- <span class="text-sm text-gray-500 line-through">$99.99</span> -->
          </div>

          <!-- Add to Cart Button -->
          <div class="mt-2 flex items-center gap-2">
            <UButton
              leadingIcon="i-lucide-shopping-cart"
              size="md"
              class="flex-1 justify-center font-semibold"
              label="Add to Cart"
            />
            <UButton leading-icon="i-lucide-trash" size="md" color="error" variant="outline" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart.store'

definePageMeta({
  layout: 'auth',
  pageHeading: 'My Wishlist',
})

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
