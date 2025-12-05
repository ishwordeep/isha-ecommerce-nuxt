<template>
  <div
    class="group relative h-full w-full overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:border-gray-200 hover:bg-[#FAF9F5] hover:shadow-lg"
    role="article"
    aria-labelledby="product-title"
  >
    <!-- Badge -->
    <div v-if="collection" class="absolute top-2 left-2 z-10">
      <span
        class="flex items-center gap-1.5 rounded-full bg-linear-to-r px-3 py-1.5 text-[10px] font-bold text-white shadow-md transition-transform group-hover:scale-105 sm:text-xs"
        :class="collection?.gradient"
      >
        <UIcon
          :name="collection?.iconName || 'i-lucide-sparkles'"
          v-if="collection?.type"
          class="h-3.5 w-3.5"
        />
        {{ collection?.badge }}
      </span>
    </div>

    <!-- Wishlist Button -->
    <!-- <button
      @click="toggleWishlist"
      :aria-label="isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'"
      class="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-md backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 hover:scale-110 hover:bg-rose-50"
      :class="{ 'text-rose-500': isWishlisted }"
    >
      <UIcon
        :name="isWishlisted ? 'i-lucide-heart-filled' : 'i-lucide-heart'"
        class="h-4 w-4 text-gray-700 transition-colors"
      />
    </button> -->

    <!-- Product Image -->
    <NuxtLink :to="`/products/${product._id}`" class="block">
      <div
        class="relative flex aspect-square items-center justify-center overflow-hidden bg-linear-to-br from-gray-50 to-gray-100 transition-transform duration-500 group-hover:scale-105"
      >
        <NuxtImg
          v-if="product.image"
          :src="product.image"
          alt="Product Image"
          class="group-hover:scale- 105 h-full w-full object-cover transition-transform duration-300"
          width="400"
          height="400"
          priority
        />
        <USkeleton v-else class="h-full w-full" />
        <!-- Optional: Add real image later -->
        <!-- <img :src="product.imageUrl" alt="" class="h-full w-full object-cover" /> -->
      </div>
    </NuxtLink>

    <!-- Product Info -->
    <div class="p-5">
      <!-- Category & Name -->
      <p class="mb-1 text-xs font-medium tracking-wider text-gray-500 uppercase">
        {{ product.categoryDetails?.name || '' }}
      </p>
      <h3
        id="product-title"
        class="mb-2 line-clamp-1 text-lg leading-tight font-bold text-gray-900"
      >
        <NuxtLink :to="`/products/${product._id}`" class="transition-colors hover:text-indigo-600">
          {{ product.name }}
        </NuxtLink>
      </h3>

      <!-- Color Swatches -->
      <div class="mb-3 flex items-center gap-1.5">
        <button
          v-for="color in product.colors"
          :key="color"
          type="button"
          @click="selectedColor = color"
          :aria-label="`Select color ${color}`"
          class="relative h-6 w-6 rounded-full border-2 transition-all duration-200 hover:scale-110"
          :class="[
            selectedColor === color
              ? 'ring-primary/30 ring-2'
              : color === '#FFFFFF'
                ? 'border-gray-300'
                : 'border-transparent',
          ]"
          :style="{ backgroundColor: color }"
        >
          <span
            v-if="selectedColor === color"
            class="absolute inset-0 flex items-center justify-center text-xs font-bold"
            :class="color === '#ffffff' ? 'text-gray-800' : 'text-white'"
          >
            ✓
          </span>
        </button>
      </div>

      <!-- Size Pills -->
      <div class="mb-4 flex flex-wrap items-center gap-1.5">
        <button
          v-for="size in product.sizes"
          :key="size"
          @click="selectedSize = size"
          class="rounded border px-2.5 py-1.5 text-xs font-medium transition-all duration-200"
          :class="[
            selectedSize === size
              ? 'border-primary/80 bg-primary/80 text-white'
              : 'text-primary/70 hover:border-primary/50 hover:bg-primary/10 border-gray-300',
          ]"
        >
          {{ size }}
        </button>
      </div>

      <!-- Price & CTA -->
      <div class="flex items-center justify-between">
        <div>
          <span class="text-lg font-bold text-gray-900 md:text-2xl">
            ${{ product.price.toFixed(2) }}
          </span>
          <!--          <span v-if="product.originalPrice" class="ml-2 text-sm text-gray-500 line-through">-->
          <!--            ${{ product.originalPrice.toFixed(2) }}-->
          <!--          </span>-->
        </div>

        <UButton
          @click="handleAddToCart(product)"
          :disabled="!canAddToCart"
          icon="i-lucide-shopping-cart"
          class="pointer-events-none flex h-10 w-10 items-center justify-center rounded-full p-0 opacity-0 shadow-lg transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100"
          :class="{ 'cursor-not-allowed opacity-50': !canAddToCart }"
          :aria-label="canAddToCart ? 'Add to cart' : 'Select size to add to cart'"
        />
      </div>
    </div>

    <!-- Hover Overlay -->
    <div
      class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    />
  </div>
</template>

<script setup lang="ts">
import type { ProductResponse } from '~/services/product.service'

const props = defineProps<{
  product: ProductResponse
  collection?: {
    title: string
    description: string
    gradient: string
    iconName?: string
    type: string
    badge: string
  }
}>()

// Reactive state
const selectedColor = ref(props.product.colors?.[0])
const selectedSize = ref(props.product.sizes?.[0])
const isWishlisted = ref(false)
const cartStore = useCartStore()
const toast = useToast()

const canAddToCart = computed(() => {
  return selectedSize.value && selectedColor.value
})

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value
  // Emit or use Pinia store
}
const { addToCart } = useAddToCart()

const handleAddToCart = (product: ProductResponse) => {
  addToCart({
    product,
    selectedColor: selectedColor.value,
    selectedSize: selectedSize.value,
  })
}
</script>
