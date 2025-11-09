<template>
  <div class="mx-auto max-w-4xl py-4 lg:py-12">
    <UCard>
      <div class="mb-8 text-center">
        <div
          class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
        >
          <UIcon name="i-heroicons-cube" class="h-10 w-10 text-green-600" />
        </div>

        <h2 class="mb-4 text-3xl font-bold">Order Confirmed!</h2>

        <p class="mb-4 text-gray-600 dark:text-gray-400">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <div class="inline-block rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <p class="mb-1 text-sm text-gray-600 dark:text-gray-400">Order Number</p>
          <p class="text-2xl font-bold">#ORD-{{ orderNumber }}</p>
        </div>
      </div>

      <UDivider class="my-6" />

      <div>
        <h3 class="mb-4 text-xl font-bold">Order Items</h3>

        <div class="space-y-4">
          <div
            v-for="item in cartItems"
            :key="item.cartId"
            class="flex items-start gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
          >
            <div class="item-image">
              {{ item.image }}
            </div>

            <div class="flex-1">
              <h4 class="font-bold">
                {{ item.name }}
              </h4>

              <div
                class="mt-1 flex flex-wrap items-center gap-2 max-sm:flex-col max-sm:items-start"
              >
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-600 dark:text-gray-400"> Color: </span>
                  <div
                    class="h-4 w-4 rounded border border-gray-300 dark:border-gray-600"
                    :style="{ backgroundColor: item.selectedColor }"
                  />
                </div>
                <span class="text-sm text-gray-400 max-sm:hidden">•</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  Size: {{ item.selectedSize }}
                </span>
                <span class="text-sm text-gray-400 max-sm:hidden">•</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  Qty: {{ item.quantity }}
                </span>
              </div>

              <p class="text-primary mt-2 text-lg font-semibold">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </p>
            </div>
          </div>
        </div>

        <USeparator class="my-6" color="neutral" />

        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span class="font-medium">${{ subtotal }}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Shipping</span>
            <span class="font-medium">$5.00</span>
          </div>

          <div class="flex justify-between pt-2 text-xl font-bold">
            <span>Total Paid</span>
            <span class="text-primary">${{ totalPaid }}</span>
          </div>
        </div>
      </div>

      <div class="mt-8 text-center">
        <UButton size="lg" @click="navigateTo('/')"> Continue Shopping</UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  rating: number
  reviews: number
  colors: string[]
  sizes: string[]
  description: string
  collection: string
}

interface CartItem extends Product {
  cartId: string
  quantity: number
  selectedColor: string
  selectedSize: string
}

// Sample cart data - in real app this would come from a cart store/composable
const cartData = ref<Product[]>([
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

// Transform products to cart items with selections
// In a real app, these selections would be stored in cart state
const cartItems = computed<CartItem[]>(() => {
  return cartData.value.map((product) => ({
    ...product,
    cartId: `cart-${product.id}`,
    quantity: 1, // Default quantity
    selectedColor: product.colors[0], // First color as default
    selectedSize: product.sizes[1] || product.sizes[0], // Second size or first as default
  }))
})

// Generate order number
const orderNumber = computed(() => {
  return Date.now().toString().slice(-6)
})

// Helper function to get color name from hex
const getColorName = (hex: string): string => {
  const colorNames: Record<string, string> = {
    '#4A5568': 'Gray',
    '#000000': 'Black',
    '#63B3ED': 'Blue',
    '#1E3A8A': 'Navy',
    '#EF4444': 'Red',
  }
  return colorNames[hex] || 'Color'
}

// Calculate subtotal
const subtotal = computed(() => {
  const total = cartItems.value.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)
  return total.toFixed(2)
})

// Calculate total with shipping
const totalPaid = computed(() => {
  return (parseFloat(subtotal.value) + 5).toFixed(2)
})
</script>
