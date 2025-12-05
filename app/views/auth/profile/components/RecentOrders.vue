<template>
  <UPageCard class="rounded-xl">
    <div class="mb-4 flex items-center justify-between">
      <h3 class="text-lg font-bold text-gray-900">Recent Orders</h3>
      <UButton
        variant="link"
        color="primary"
        trailing-icon="i-lucide-chevron-right"
        to="/auth/orders"
        size="sm"
        viewTransition
        v-if="orderStore.orders?.length"
      >
        View All
      </UButton>
    </div>
    <div class="space-y-3" v-if="orderStore.orders?.length">
      <div
        v-for="order in orderStore.orders?.slice(0, 5)"
        :key="order._id"
        class="flex items-center justify-between rounded-lg bg-gray-50 p-3"
      >
        <div>
          <div class="sm:text-md text-sm font-medium text-gray-900">{{ order.orderNumber }}</div>
          <div class="text-xs text-gray-500">
            {{ new Date(order.createdAt).toLocaleDateString() }}
          </div>
        </div>
        <OrderStatusBadge :status="order.status" />
      </div>
    </div>

    <p v-else class="text-gray-600">
      You have no recent orders.
      <NuxtLink to="/products" class="text-primary ml-1 underline" viewTransition>
        Start shopping now!
      </NuxtLink>
    </p>
  </UPageCard>
</template>

<script setup lang="ts">
import OrderStatusBadge from '~/components/ui/OrderStatusBadge.vue'
import { useOrderStore } from '~/stores/order.store'

const orderStore = useOrderStore()

onMounted(async () => {
  if (!orderStore.orders?.length) {
    await orderStore.fetchOrders()
  }
})
</script>
