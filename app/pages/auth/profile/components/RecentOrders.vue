<template>
  <div class="rounded-xl border border-gray-200 bg-white p-6">
    <div class="mb-4 flex items-center justify-between">
      <h3 class="text-lg font-bold text-gray-900">Recent Orders</h3>
      <UButton
        variant="link"
        color="primary"
        trailing-icon="i-lucide-chevron-right"
        to="/auth/orders"
        size="sm"
        viewTransition
      >
        View All
      </UButton>
    </div>
    <div class="space-y-3">
      <div
        v-for="order in orderStore.orders?.slice(0, 3)"
        :key="order._id"
        class="flex items-center justify-between rounded-lg bg-gray-50 p-3"
      >
        <div>
          <div class="font-medium text-gray-900">{{ order._id }}</div>
          <div class="text-xs text-gray-500">{{ order.date }}</div>
        </div>
        <OrderStatusBadge :status="order.status" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from '~/stores/order.store'
import OrderStatusBadge from '~/components/ui/OrderStatusBadge.vue'

const orderStore = useOrderStore()

onMounted(async () => {
  if (!orderStore.orders?.length) {
    await orderStore.fetchOrders()
  }
})
</script>
