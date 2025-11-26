<template>
  <div class="space-y-4">
    <OrderSkeleton v-if="state.fetching" />
    <div
      v-else
      v-for="order in orderStore.orders"
      :key="order._id"
      class="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
    >
      <div class="mb-4 flex items-start justify-between">
        <div>
          <div class="mb-2 flex flex-wrap items-center gap-3">
            <h3 class="text-lg font-bold text-gray-900">{{ order._id }}</h3>
            <OrderStatusBadge :status="order.status" />
          </div>
          <div class="text-sm text-gray-500">
            Placed on {{ order.date }} • {{ order.items }} items
          </div>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-gray-900">${{ order.total.toFixed(2) }}</div>
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
        <div class="flex gap-3">
          <div
            v-for="(product, idx) in order.products"
            :key="idx"
            class="flex items-center gap-2 rounded-lg bg-gray-50 p-2"
          >
            <div class="text-2xl">{{ product.image }}</div>
            <div class="text-xs">
              <div class="font-medium text-gray-900">{{ product.name }}</div>
              <div class="text-gray-500">Qty: {{ Math.floor(Math.random() * 1000) }}</div>
            </div>
          </div>
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
