<template>
  <div class="space-y-4">
    <OrderSkeleton v-if="state.fetching" />
    <div
      v-else-if="!state.fetching && orderStore.orders?.length"
      v-for="order in orderStore.orders"
      :key="order._id"
      class="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
    >
      <div class="mb-4 flex items-start justify-between">
        <div>
          <div class="mb-2 flex flex-wrap items-center gap-3">
            <h3 class="text-md font-bold text-gray-900 sm:text-lg">{{ order.orderNumber }}</h3>
            <OrderStatusBadge :status="order.status" />
          </div>
          <div class="text-sm text-gray-500">
            Placed on {{ new Date(order.createdAt).toLocaleDateString() }} •
            {{ order.items.length }} items
          </div>
        </div>
        <div class="text-right">
          <div class="text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl">
            ${{ order.grandTotal.toFixed(2) }}
          </div>
          <UButton
            variant="link"
            color="primary"
            leading-icon="i-lucide-eye"
            size="sm"
            label="View Details"
            @click="viewOrderDetail(order)"
          />
        </div>
      </div>

      <div class="border-t border-t-gray-300 pt-4">
        <div class="flex flex-wrap gap-3">
          <NuxtLink
            v-for="(product, idx) in order.items"
            :key="idx"
            class="flex items-center gap-2 rounded-lg bg-gray-50 p-2"
            :to="`/products/${product.productId}`"
            viewTransition
          >
            <div
              class="aspect-square w-16 rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-900"
            >
              <NuxtImg
                :src="product.image"
                :alt="product.name"
                class="h-full w-full rounded-md object-cover"
                v-if="product.image"
              />
            </div>
            <div class="text-xs">
              <div class="font-medium text-gray-900">{{ product.name }}</div>
              <div class="text-gray-500">Qty: {{ product.quantity }}</div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="mt-4 flex flex-wrap gap-2">
        <button
          class="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Track Order
        </button>
        <button
          class="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Invoice
        </button>
        <button
          class="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Return
        </button>
      </div>
    </div>

    <!-- Empty State – Beautiful & Engaging -->
    <div v-else class="py-16 text-center">
      <div class="mx-auto max-w-md">
        <!-- Illustration / Icon -->
        <div
          class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100"
        >
          <UIcon name="i-lucide-package-open" class="h-12 w-12 text-gray-400" />
        </div>

        <h3 class="mb-3 text-xl font-semibold text-gray-900">No orders yet</h3>

        <p class="mb-8 text-gray-600">
          Looks like you haven't placed any orders. When you do, they'll appear here.
        </p>

        <!-- Call to Action -->
        <UButton
          to="/products"
          color="primary"
          size="lg"
          label="Start Shopping"
          leading-icon="i-lucide-shopping-bag"
          class="font-medium"
        />
      </div>
    </div>

    <OrderDetail v-model:open="openDetail" />
  </div>
</template>

<script setup lang="ts">
import OrderStatusBadge from '~/components/ui/OrderStatusBadge.vue'
import type { OrderResponse } from '~/services/order.service'
import { useOrderStore } from '~/stores/order.store'
import OrderDetail from './components/OrderDetail.vue'
import OrderSkeleton from './components/OrderSkeleton.vue'

const openDetail = ref(false)
const state = reactive({
  fetching: false,
})

const orderStore = useOrderStore()

onMounted(async () => {
  state.fetching = true
  if (!orderStore.orders?.length) {
    await orderStore.fetchOrders()
  }
  state.fetching = false
})

const viewOrderDetail = (order: OrderResponse) => {
  console.log(order)
  orderStore.selectedOrder = order
  openDetail.value = true
}
</script>
