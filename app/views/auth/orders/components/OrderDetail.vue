<template>
  <UModal
    v-model:open="isOpen"
    title="Order Details"
    :description="`${orderStore.selectedOrder?._id || ''}`"
  >
    <template #body>
      <div class="space-y-6">
        <!-- Order header -->
        <div class="flex items-center justify-between border-b pb-4">
          <div>
            <div class="mb-1 text-sm text-gray-600">Order Date</div>
            <div class="font-medium">{{ orderStore.selectedOrder?.date }}</div>
          </div>
          <OrderStatusBadge :status="orderStore.selectedOrder?.status || ''" />
        </div>

        <!-- Order Items -->
        <div>
          <h4 class="mb-3 font-bold text-gray-900">Order Items</h4>
          <div class="space-y-3">
            <div
              v-for="(product, idx) in orderStore.selectedOrder?.products"
              :key="idx"
              class="flex gap-4 rounded-lg bg-gray-50 p-4"
            >
              <div class="rounded-lg border border-gray-200 bg-white p-3 text-4xl">
                {{ product.image }}
              </div>
              <div class="flex-1">
                <h5 class="font-semibold text-gray-900">{{ product.name }}</h5>
                <div class="mt-1 flex items-center gap-2 text-sm text-gray-600">
                  Color:
                  <span
                    class="border-default block inline-flex h-4 w-4 shrink-0 rounded-md border"
                    :class="`bg-${product.color}`"
                    :style="{ background: product.color }"
                  />
                  • Size: {{ product.size }}
                </div>
                <div class="mt-2 flex items-center justify-between">
                  <span class="text-sm text-gray-600">Quantity: {{ product.qty }}</span>
                  <span class="font-bold text-gray-900">
                    ${{ (product.price * product.qty).toFixed(2) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Totals -->
        <div class="border-t pt-4">
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-medium">${{ orderStore.selectedOrder?.total?.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Shipping</span>
              <span class="font-medium">$5.00</span>
            </div>
            <div class="flex justify-between border-t pt-2 text-lg font-bold">
              <span>Total</span>
              <span class="text-primary">
                ${{ ((orderStore.selectedOrder?.total || 0) + 5).toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { useOrderStore } from '~/stores/order.store'
import OrderStatusBadge from '~/components/ui/OrderStatusBadge.vue'

const orderStore = useOrderStore()

const props = defineProps<{
  open: boolean
}>()

// Use v-model:open two-way binding
const emit = defineEmits(['update:open'])

console.log(props.open)

const isOpen = computed({
  get: () => props.open,
  set: (val) => emit('update:open', val),
})
</script>
