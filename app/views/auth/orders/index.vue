<template>
  <div class="space-y-4">
    <!-- Status Tabs -->
    <UCard class="mb-6">
      <UTabs
        :items="
          statusOptions.map((s) => ({
            ...s,
            label: `${s.label} (${statusCounts[s.value as keyof typeof statusCounts]})`,
          }))
        "
        v-model="selectedStatus"
        class="w-full"
      />
    </UCard>

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
            <OrderStatusBadge :status="order.status as OrderStatus" />
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
            class="flex items-start gap-2 rounded-lg bg-gray-50 p-2"
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
            <div class="flex flex-col gap-1 px-2">
              <span class="text-sm font-medium text-gray-900">{{ product.name }}</span>
              <span class="text-xs text-gray-500">Qty: {{ product.quantity }}</span>
              <span
                class="inline-flex items-center gap-1 text-xs text-gray-500"
                v-if="product.color"
              >
                Color:
                <UTooltip
                  :delay-duration="0"
                  :text="product.color"
                  :content="{
                    side: 'top',
                  }"
                >
                  <span
                    :style="{ backgroundColor: product.color }"
                    class="inline-flex h-4 w-4 rounded-md border border-gray-300"
                  ></span>
                </UTooltip>
              </span>
              <span
                class="inline-flex items-center gap-1 text-xs text-gray-500"
                v-if="product.size"
              >
                Size: {{ product.size }}
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
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
        <button
          class="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          @click="handlePayment(order)"
          v-if="order.paymentStatus === 'unpaid'"
        >
          Pay Now
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
          {{ getEmptyMessage }}
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
import axiosService from '~/services/axios.service'
import type { OrderResponse, OrderStatus } from '~/services/order.service'
import { useOrderStore } from '~/stores/order.store'
import OrderDetail from './components/OrderDetail.vue'
import OrderSkeleton from './components/OrderSkeleton.vue'

const openDetail = ref(false)
const searchTerm = ref('')
const selectedStatus = ref<'pending' | string>('pending')
// Pagination
const pagination = reactive({
  page: 1,
  limit: 10,
  total: computed(() => orderStore.pagination?.total || 0),
})

const getSelectedStatus = computed(() => {
  return selectedStatus.value === 'pending'
    ? 'PENDING_PAYMENT'
    : selectedStatus.value === 'paid'
      ? 'PAID'
      : selectedStatus.value === 'shipped'
        ? 'SHIPPED'
        : selectedStatus.value === 'completed'
          ? 'COMPLETED'
          : selectedStatus.value === 'cancelled'
            ? 'CANCELLED'
            : ''
})

const getEmptyMessage = computed(() => {
  if (searchTerm.value) {
    return `No orders found for "${searchTerm.value}". Please try a different search term.`
  }
  switch (selectedStatus.value) {
    case 'pending':
      return 'You have no pending orders.'
    case 'paid':
      return 'You have no paid orders.'
    case 'shipped':
      return 'You have no shipped orders.'
    case 'completed':
      return 'You have no completed orders.'
    case 'cancelled':
      return 'You have no cancelled orders.'
    default:
      return 'You have no orders.'
  }
})

const statusOptions = [
  { value: 'pending', label: 'Pending', icon: 'i-lucide-clock' },
  { value: 'paid', label: 'Paid', icon: 'i-lucide-package' },
  { value: 'shipped', label: 'Shipped', icon: 'i-lucide-truck' },
  { value: 'completed', label: 'Completed', icon: 'i-lucide-check-circle' },
  { value: 'cancelled', label: 'Cancelled', icon: 'i-lucide-x-circle' },
]

// Status tabs with counts
const statusCounts = computed(() => {
  const pending = orderStore.orders?.length || 0
  const map = { pending, paid: 0, shipped: 0, completed: 0, cancelled: 0 }

  orderStore.orders?.forEach((o: OrderResponse) => {
    if (map[o.status as keyof typeof map] !== undefined) {
      map[o.status as keyof typeof map]++
    }
  })

  return map
})

const state = reactive({
  fetching: false,
})

const orderStore = useOrderStore()

// Fetch orders
const fetchOrders = async () => {
  state.fetching = true

  await orderStore.fetchOrders({
    page: pagination.page,
    limit: pagination.limit,
    search: searchTerm.value,
    status: getSelectedStatus.value,
  })
  state.fetching = false
}

watch([() => pagination.page, () => pagination.limit, searchTerm, selectedStatus], fetchOrders, {
  immediate: true,
})

const viewOrderDetail = (order: OrderResponse) => {
  console.log(order)
  orderStore.selectedOrder = order
  openDetail.value = true
}

const handlePayment = async (order: OrderResponse) => {
  await axiosService.post(`/order/${order?.orderNumber}/payment-intent`, {})
}
</script>
