<template>
  <UDrawer
    v-model:open="open"
    direction="right"
    :handle="false"
    :ui="{
      content: 'w-full sm:w-[500px] rounded-none',
      body: 'px-4 overflow-y-auto',
      container: 'p-0',
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
      <template v-if="state.isUpdating">
        <div
          class="absolute inset-0 z-50 flex h-full w-full items-center justify-center bg-white/70"
        >
          <div
            class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-r-transparent"
          ></div>
        </div>
      </template>
      <div class="flex flex-col gap-4">
        <template v-if="state.isFetching">
          <USkeleton v-for="i in 4" :key="i" class="h-24 w-full" />
        </template>

        <template v-else-if="!cartStore.carts?.length && !state.isFetching">
          <p>Your cart is currently empty.</p>
        </template>

        <template v-else>
          <div
            v-for="item in cartStore.carts"
            :key="item.productId"
            class="border-default relative flex items-start gap-4 rounded-lg border bg-gray-50 p-2 sm:p-4"
          >
            <div
              class="aspect-square w-20 rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-900"
            >
              <NuxtImg
                :src="item.image"
                alt="Product Image"
                class="h-full w-full rounded-md object-cover"
                v-if="item.image"
              />
            </div>
            <div class="flex flex-1 flex-col">
              <h3 class="line-clamp-2 text-lg font-semibold">{{ item.name }}</h3>
              <div class="mt-2 flex gap-2 max-sm:flex-col sm:items-center">
                <div class="flex items-center gap-1">
                  <span class="text-sm font-medium">Color:</span>
                  <span
                    :style="{ backgroundColor: item.color }"
                    class="border-default h-5 w-5 rounded-sm border"
                  ></span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="text-sm font-medium">Size:</span>
                  <span class="line-clamp-1 text-sm">{{ item.size }}</span>
                </div>
              </div>
              <div class="mt-2 flex items-center gap-2"></div>
              <div
                class="mt-2 flex items-start justify-between gap-2 max-sm:flex-col max-sm:text-sm sm:items-center"
              >
                <UInput
                  :min="1"
                  class="max-w-[100px] p-0"
                  size="md"
                  variant="subtle"
                  :value="item.quantity"
                  disabled
                  :ui="{
                    base: 'px-0 ps-11',
                    leading: 'ps-1',
                    trailing: 'pe-1         ',
                  }"
                >
                  <template #leading>
                    <UButton
                      icon="i-lucide-minus"
                      class="mr-2"
                      size="sm"
                      variant="ghost"
                      @click="stepQuantity(item, 'decrease')"
                    />
                  </template>

                  <template #trailing>
                    <UButton
                      icon="i-lucide-plus"
                      class="ml-2"
                      size="sm"
                      variant="ghost"
                      @click="stepQuantity(item, 'increase')"
                    />
                  </template>
                </UInput>
                <span class="text-primary font-medium"
                  >${{ item.price * item.quantity }} &nbsp;
                  <!--                <span class="text-secondary line-through">$4000</span>-->
                </span>
              </div>
            </div>
            <UButton
              size="sm"
              variant="ghost"
              color="error"
              icon="i-lucide-trash"
              class="top-1 right-1 max-sm:absolute"
            />
          </div>
        </template>
      </div>
    </template>

    <template #footer>
      <div class="border-t-default flex flex-col gap-4 border-t bg-gray-50 p-4">
        <div class="flex items-center justify-between">
          <span class="text-lg font-semibold">Total:</span>
          <span class="text-primary text-2xl font-bold">${{ cartStore.cartTotal }}</span>
        </div>
        <UButton
          label="Proceed to Checkout"
          color="primary"
          :ui="{
            label: 'w-full text-center',
            base: 'py-3 sm:size-xl size-sm',
          }"
          to="/checkout"
          @click="open = false"
        />
      </div>
    </template>
  </UDrawer>
</template>

<script setup lang="ts">
import type { Item } from '~/services/cart.service'

const open = ref(false)
const cartStore = useCartStore()
const state = reactive({
  isFetching: false,
  isUpdating: false,
})

onMounted(async () => {
  state.isFetching = true
  if (!cartStore.carts) await cartStore.fetchCarts()
  state.isFetching = false
})

const stepQuantity = async (item: Item, type: 'increase' | 'decrease') => {
  state.isUpdating = true
  setTimeout(() => {
    if (type === 'increase') {
      cartStore.carts?.find((cartItem) => {
        if (cartItem.productId === item.productId) {
          cartItem.quantity += 1
        }
      })
    } else {
      console.log('Decreasing Quantity', item.productId, item.quantity--)
      cartStore.carts?.find((cartItem) => {
        if (cartItem.productId === item.productId) {
          cartItem.quantity -= 1
        }
      })
    }
    state.isUpdating = false
  }, 500)
}
</script>
