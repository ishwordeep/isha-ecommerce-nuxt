<template>
  <UPageCard class="h-max" title="Order Summary">
    <div class="flex max-h-[90dvh] flex-col overflow-y-auto pr-2 sm:max-h-[57dvh]">
      <!-- Items -->

      <UiOrderItem v-for="item in orderItems" :key="item.productId" :item="item" />

      <!-- Totals -->
      <div class="sticky bottom-0 border-t border-gray-600 bg-white pt-4">
        <div class="space-y-2">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span>${{ totals.subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Shipping</span>
            <span>${{ totals.shipping.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span class="text-primary">${{ totals.total.toFixed(2) }}</span>
          </div>
        </div>

        <UButton
          type="submit"
          form="checkout-form"
          label="Place Order"
          class="mt-4 w-full justify-center"
          color="primary"
          :disabled="disableButton"
          :loading="isPlacingOrder"
          v-if="showButton"
        />

        <span class="text-sm text-gray-500 italic" v-if="showButton">
          Fill in all required fields marked with <span class="text-error">*</span> to proceed with
          your order.
        </span>
      </div>
    </div>
  </UPageCard>
</template>

<script setup lang="ts">
const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()
const authStore = useAuthStore()
const orderStore = useOrderStore()
const totals = ref({
  subtotal: 0,
  shipping: 0,
  total: 0,
})
const route = useRoute()
const id = route.params.id as string | undefined

const props = withDefaults(
  defineProps<{
    isPlacingOrder: boolean
    showButton?: boolean
  }>(),
  {
    showButton: true,
  }
)

const orderItems = computed(() => {
  if (id && orderStore.selectedOrder?.items) {
    console.log({
      orderItems: orderStore.selectedOrder?.items,
      cartItems: cartStore.carts,
    })
    return orderStore.selectedOrder.items
  }
  console.log({
    orderItems: orderStore.selectedOrder?.items,
    cartItems: cartStore.carts,
  })
  return cartStore.carts
})

onMounted(async () => {
  if (id) {
    if (!checkoutStore.selectedOrder) {
      const response = await orderStore.fetchOrderById(id)
      totals.value = {
        subtotal: response?.data?.data?.subtotal || 0,
        shipping: response?.data?.data?.shippingFee || 0,
        total: response?.data?.data?.grandTotal || 0,
      }

      orderStore.orderTotals = totals.value
    } else {
      totals.value = {
        subtotal: checkoutStore.selectedOrder.subtotal,
        shipping: checkoutStore.selectedOrder.shippingFee,
        total: checkoutStore.selectedOrder.grandTotal,
      }

      orderStore.orderTotals = totals.value
    }
  } else {
    totals.value = cartStore.totals
    orderStore.orderTotals = cartStore.totals
  }
})

const disableButton = computed(() => {
  return !(
    checkoutStore.formInputs.name &&
    checkoutStore.formInputs.email &&
    checkoutStore.formInputs.phone &&
    authStore.selectedAddress
  )
})
</script>
