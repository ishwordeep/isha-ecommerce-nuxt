<template>
  <UModal v-model:open="isOpen" :title="`${orderStore.selectedOrder?.orderNumber || ''}`">
    <template #body>
      <div class="space-y-6">
        <!-- Order header -->
        <div class="flex items-center justify-between border-b border-b-gray-300 pb-4">
          <div>
            <div class="mb-1 text-sm text-gray-600">Order Date</div>
            <div class="font-medium">
              {{ new Date(orderStore.selectedOrder?.createdAt || '').toLocaleDateString() }}
            </div>
          </div>
          <OrderStatusBadge :status="orderStore.selectedOrder?.status as OrderStatus" />
        </div>

        <!-- Order Items -->
        <div>
          <h4 class="mb-3 font-bold text-gray-900">Order Items</h4>
          <div class="space-y-4">
            <NuxtLink
              v-for="(product, idx) in orderStore.selectedOrder?.items"
              :key="idx"
              class="flex gap-4 rounded-lg bg-gray-50 p-4"
              :to="`/products/${product.productId}`"
            >
              <div
                class="aspect-square w-16 shrink-0 rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-900"
              >
                <NuxtImg
                  :src="product.image"
                  :alt="product.name"
                  class="h-full w-full rounded-md object-cover"
                  v-if="product.image"
                />
              </div>
              <div class="flex-1">
                <h5 class="font-semibold text-gray-900">{{ product.name }}</h5>
                <div class="mt-1 flex items-center gap-2 text-sm text-gray-600">
                  Color:
                  <UTooltip
                    :delay-duration="0"
                    :text="product.color"
                    :content="{
                      side: 'top',
                    }"
                  >
                    <span
                      class="border-default inline-flex h-4 w-4 shrink-0 rounded-md border"
                      :class="`bg-${product.color}`"
                      :style="{ background: product.color }"
                    />
                  </UTooltip>
                  • Size: {{ product.size }}
                </div>
                <div class="mt-2 flex items-center justify-between">
                  <span class="text-sm text-gray-600">Quantity: {{ product.quantity }}</span>
                  <span class="font-bold text-gray-900">
                    ${{ (product.price * product.quantity).toFixed(2) }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Shipping Address -->
        <div>
          <h3 class="mb-3 font-bold">Shipping</h3>
          <UCard variant="soft">
            {{ orderStore.selectedOrder?.shippingAddress.street }},
            {{ orderStore.selectedOrder?.shippingAddress.apartment }},
            {{ orderStore.selectedOrder?.shippingAddress.city }},
            {{ orderStore.selectedOrder?.shippingAddress.state }},
            {{ orderStore.selectedOrder?.shippingAddress.zipCode }},
            {{ orderStore.selectedOrder?.shippingAddress.country }}
          </UCard>
        </div>

        <!-- Totals -->
        <div class="border-t border-t-gray-300 pt-4">
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-medium">${{ orderStore.selectedOrder?.subtotal?.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Shipping</span>
              <span class="font-medium"
                >${{ orderStore.selectedOrder?.shippingFee?.toFixed(2) }}</span
              >
            </div>
            <div class="flex justify-between border-t border-t-gray-300 pt-2 text-lg font-bold">
              <span>Total</span>
              <span class="text-primary">
                ${{ (orderStore.selectedOrder?.grandTotal || 0).toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import OrderStatusBadge from '~/components/ui/OrderStatusBadge.vue'
import type { OrderStatus } from '~/services/order.service'
import { useOrderStore } from '~/stores/order.store'

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
