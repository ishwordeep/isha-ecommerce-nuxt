<template>
  <UPageCard class="h-max" title="Order Summary">
    <div class="flex max-h-[90dvh] flex-col overflow-y-auto pr-2 sm:max-h-[57dvh]">
      <!-- Cart Items -->
      <div
        v-for="item in cartStore.carts"
        :key="item.productId"
        class="border-b border-gray-200 py-4 last:border-b-0"
      >
        <div class="flex gap-4">
          <div class="border-default aspect-square w-20 shrink-0 rounded-md border">
            <NuxtImg
              v-if="item.image"
              :src="item.image"
              alt="Product"
              class="h-full w-full rounded-md object-cover"
            />
          </div>
          <div class="flex-1">
            <h3 class="font-medium">{{ item.name }}</h3>
            <div
              class="mt-1 flex items-center gap-4 text-sm text-gray-600"
              v-if="item.size || item.color"
            >
              <span v-if="item.color"
                >Color:
                <span
                  :style="{ backgroundColor: item.color }"
                  class="inline-block h-4 w-4 rounded border"
                >
                </span
              ></span>
              <span v-if="item.size">Size: {{ item.size }}</span>
            </div>
            <div class="mt-2 flex justify-between">
              <span>Qty: {{ item.quantity }}</span>
              <span class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Totals -->
      <div class="sticky bottom-0 border-t border-gray-600 bg-white pt-4">
        <div class="space-y-2">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span>${{ cartStore.totals.subTotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Shipping</span>
            <span>${{ cartStore.totals.shipping.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span class="text-primary">${{ cartStore.totals.total.toFixed(2) }}</span>
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
import axiosService from '~/services/axios.service'

const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()
const authStore = useAuthStore()
const totals = ref({ ...cartStore.totals })
const route = useRoute()

const props = withDefaults(
  defineProps<{
    isPlacingOrder: boolean
    showButton?: boolean
  }>(),
  {
    showButton: true,
  }
)

watch(
  () => cartStore.totals,
  (newTotals) => {
    if (!route.params.id) {
      totals.value = newTotals
    }
  },
  { deep: true }
)

onMounted(async () => {
  if (route.params.id) {
    if (!checkoutStore.selectedOrder) {
      const response = await axiosService.get(`/orders/${route.params.id}`)
      // 3. Overwrite the local ref
      totals.value = {
        subTotal: response.data.data.subTotal,
        shipping: response.data.data.shipping,
        total: response.data.data.total,
      }
    } else {
      // 3. Overwrite the local ref
      totals.value = {
        subTotal: checkoutStore.selectedOrder.subtotal,
        shipping: checkoutStore.selectedOrder.shippingFee,
        total: checkoutStore.selectedOrder.grandTotal,
      }
    }
  }
})

const disableButton = computed(() => {
  return !(
    checkoutStore.formInputs.name &&
    checkoutStore.formInputs.email &&
    checkoutStore.formInputs.phone &&
    checkoutStore.formInputs.paymentMethod &&
    authStore.selectedAddress
  )
})
</script>
