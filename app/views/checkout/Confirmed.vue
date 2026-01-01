<template>
  <div class="mx-auto max-w-4xl py-4 lg:py-12">
    <UCard>
      <div class="mb-8 text-center">
        <div
          class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
        >
          <UIcon name="i-heroicons-cube" class="h-10 w-10 text-green-600" />
        </div>

        <h2 class="mb-4 text-3xl font-bold">Order Confirmed!</h2>

        <p class="mb-4 text-gray-600 dark:text-gray-400">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <div class="inline-block rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <p class="mb-1 text-sm text-gray-600 dark:text-gray-400">Order Number</p>
          <p class="text-lg font-bold sm:text-xl lg:text-2xl">
            #{{ orderStore.selectedOrder?.orderNumber }}
          </p>
        </div>
      </div>

      <USeparator class="my-6" color="neutral" />

      <div>
        <h3 class="mb-4 text-xl font-bold">Order Items</h3>

        <div class="max-h-[40dvh] space-y-4 overflow-y-auto pr-2">
          <div
            v-for="item in orderStore.selectedOrder?.items"
            :key="item.productId"
            class="flex items-start gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
          >
            <div
              class="aspect-square w-20 rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-900"
            >
              <NuxtImg
                :src="item.image"
                alt="Product Image"
                class="h-full w-full rounded-md object-cover"
                v-if="item.image"
              />
            </div>

            <div class="flex-1">
              <h4 class="font-bold">
                {{ item.name }}
              </h4>

              <div
                class="mt-1 flex flex-wrap items-center gap-2 max-sm:flex-col max-sm:items-start"
              >
                <div class="flex items-center gap-2" v-if="item.color">
                  <span class="text-sm text-gray-600 dark:text-gray-400"> Color: </span>
                  <div
                    class="h-4 w-4 rounded border border-gray-300 dark:border-gray-600"
                    :style="{ backgroundColor: item.color }"
                  />
                </div>
                <span class="text-sm text-gray-400 max-sm:hidden" v-if="item.color && item.size"
                  >•</span
                >
                <span class="text-sm text-gray-600 dark:text-gray-400" v-if="item.size">
                  Size: {{ item.size }}
                </span>
                <span class="text-sm text-gray-400 max-sm:hidden" v-if="item.size">•</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  Qty: {{ item.quantity }}
                </span>
              </div>

              <p class="text-primary mt-2 text-lg font-semibold">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </p>
            </div>
          </div>
        </div>

        <USeparator class="my-6" color="neutral" />

        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span class="font-medium">${{ orderStore.selectedOrder?.subtotal.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Shipping</span>
            <span class="font-medium">${{ orderStore.selectedOrder?.shippingFee.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between pt-2 text-xl font-bold">
            <span>Total Paid</span>
            <span class="text-primary">${{ orderStore.selectedOrder?.grandTotal.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <div class="mt-8 flex items-center justify-center text-center">
        <!-- <UButton
          v-if="orderStore.selectedOrder?.paymentStatus === 'unpaid'"
          variant="outline"
          size="lg"
          class="mr-4"
          @click="handlePayment(orderStore.selectedOrder!)"
          label="Pay Now"
        /> -->
        <UButton size="lg" @click="navigateTo('/')"> Continue Shopping</UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'

const orderStore = useOrderStore()
const cartStore = useCartStore()
const config = useRuntimeConfig()
const route = useRoute()

const isLoading = ref(true)
const paymentStatus = ref<'loading' | 'success' | 'failed' | 'processing'>('loading')

onMounted(async () => {
  // 1. Get the Payment Intent secret from the URL redirect
  const clientSecret = route.query.payment_intent_client_secret

  if (clientSecret) {
    try {
      const stripe = await loadStripe(config.public.stripePublishableKey)
      if (stripe) {
        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret as string)

        if (paymentIntent?.status === 'succeeded') {
          paymentStatus.value = 'success'
          // 2. Fetch fresh order data from backend (which should now be marked as 'paid')
          if (orderStore.selectedOrder?._id) {
            await orderStore.fetchOrderById(orderStore.selectedOrder._id)
          }
          // 3. Clear the cart since purchase is confirmed
          cartStore.reset()
        } else {
          paymentStatus.value = 'failed'
        }
      }
    } catch (e) {
      console.error('Verification error:', e)
      paymentStatus.value = 'failed'
    } finally {
      isLoading.value = false
    }
  } else {
    // If we arrived here without a clientSecret, check if we have a pre-existing order
    if (!orderStore.selectedOrder) {
      navigateTo('/')
    }
    paymentStatus.value = 'success'
    isLoading.value = false
  }
})
</script>
