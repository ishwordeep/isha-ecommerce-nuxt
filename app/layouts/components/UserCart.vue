<template>
  <UDrawer
    v-model:open="open"
    direction="right"
    :handle="false"
    :ui="{
      content: 'w-full sm:w-[500px] rounded-none',
      container: 'p-0 overflow-hidden',
    }"
  >
    <UButton
      color="neutral"
      square
      class="rounded-full"
      variant="ghost"
      icon="i-lucide-shopping-cart"
      viewTransition
    />

    <template #header>
      <div class="border-b-default flex items-center justify-between border-b p-4">
        <h2 class="text-2xl font-semibold text-black">My Cart</h2>
        <UButton color="neutral" square variant="ghost" icon="i-lucide-x" @click="open = false" />
      </div>
    </template>

    <template #body>
      <div class="p-4" v-if="!cartData.length">
        <p>Your cart is currently empty.</p>
      </div>

      <div v-else class="flex flex-col gap-4 p-4">
        <div
          v-for="item in cartData"
          :key="item.id"
          class="border-default flex items-start gap-4 rounded-lg border bg-gray-50 p-2 p-4"
        >
          <div class="text-5xl">{{ item.image }}</div>
          <div class="flex flex-1 flex-col">
            <h3 class="line-clamp-2 text-lg font-semibold">{{ item.name }}</h3>
            <div class="mt-2 flex items-center gap-2">
              <span class="text-sm font-medium">Color:</span>
              <span
                :style="{ backgroundColor: item.colors[0] }"
                class="border-default h-5 w-5 rounded-sm border"
              ></span>
              <span class="text-sm font-medium">Size:</span>
              <span class="text-sm">{{ item.sizes[0] }}</span>
            </div>
            <div class="mt-2 flex items-center gap-2"></div>
            <div
              class="mt-2 flex items-start justify-between gap-2 max-sm:flex-col max-sm:text-sm sm:items-center"
            >
              <UInputNumber :min="1" class="max-w-[100px] p-0" size="md" variant="subtle" />
              <span class="text-primary font-medium"
                >${{ item.price.toFixed(2) }} &nbsp;
                <!--                <span class="text-secondary line-through">$4000</span>-->
              </span>
            </div>
          </div>
          <UButton size="sm" variant="ghost" color="error" icon="i-lucide-x" />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="border-t-default flex flex-col gap-4 border-t bg-gray-50 p-4">
        <div class="flex items-center justify-between">
          <span class="text-lg font-semibold">Total:</span>
          <span class="text-primary text-2xl font-bold">$209.99</span>
        </div>
        <UButton
          label="Proceed to Checkout"
          color="primary"
          :ui="{
            label: 'w-full text-center',
            base: 'py-3',
          }"
          to="/checkout"
          @click="open = false"
        />
      </div>
    </template>
  </UDrawer>
</template>

<script setup lang="ts">
const open = ref(false)

const cartData = ref([
  {
    id: 1,
    name: 'Classic Denim Jacket',
    price: 89.99,
    image: '🧥',
    category: 'Jackets',
    rating: 4.5,
    reviews: 128,
    colors: ['#4A5568', '#000000', '#63B3ED'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Premium quality denim jacket with a classic fit. Perfect for casual wear.',
    collection: 'new-arrivals',
  },

  {
    id: 2,
    name: 'Elegant Black Dress',
    price: 120.0,
    image: '👗',
    category: 'Dresses',
    rating: 4.7,
    reviews: 89,
    colors: ['#000000', '#1E3A8A', '#EF4444'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Elegant dress perfect for formal occasions and evening events.',
    collection: 'featured',
  },
])
</script>
