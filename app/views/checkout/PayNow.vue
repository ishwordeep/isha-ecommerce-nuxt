<script setup lang="ts">
import OrderSummary from './components/OrderSummary.vue'

const checkoutStore = useCheckoutStore()
const loadPage = ref(false)

onMounted(() => {
  // if (!checkoutStore.clientCode) {
  //   navigateTo('/checkout')
  //   return
  // }
  loadPage.value = true
})
</script>

<template>
  <div v-if="loadPage">
    <!-- Back Button -->
    <UButton
      to="/checkout"
      variant="ghost"
      color="neutral"
      icon="i-lucide-arrow-left"
      label="Back to Checkout"
      class="mb-2"
    />

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-5">
      <!-- Payment Form (3/5) -->
      <div class="lg:col-span-3">
        <UiPayNowForm />
      </div>

      <!-- Order Summary (2/5) -->
      <div class="lg:col-span-2">
        <OrderSummary :isPlacingOrder="false" :showButton="false" />
      </div>
    </div>
  </div>
  <UiLoader v-else />
</template>
