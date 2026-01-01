<script setup lang="ts">
import { loadStripe, type Stripe, type StripeElements } from '@stripe/stripe-js'

const config = useRuntimeConfig()
const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()
const processing = ref(false)
const errorMessage = ref('')
const paymentElement = ref(null)

let stripe: Stripe | null = null
let elements: StripeElements | null = null

onMounted(async () => {
  console.log(config.public.stripePublishableKey)

  // 1. Initialize Stripe
  stripe = await loadStripe(config.public.stripePublishableKey)

  if (stripe && checkoutStore.clientSecret) {
    // 1. Initialize elements with the secret from your backend
    elements = stripe.elements({
      clientSecret: checkoutStore.clientSecret,
      appearance: { theme: 'stripe' }, // Optional: customize the look
    })

    // 2. Create the unified Payment Element
    const paymentElementInstance = elements.create('payment', {
      layout: {
        type: 'tabs',
        defaultCollapsed: false,
      },
    })

    // 3. Mount to your ref
    if (paymentElement.value) {
      paymentElementInstance.mount(paymentElement.value)
    }
  }
})

/* ----------------------------
 * Submit Handler
 * ---------------------------- */
const handlePayment = async () => {
  if (!stripe || !elements || processing.value) return

  processing.value = true
  errorMessage.value = ''

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: `${window.location.origin}/checkout/confirmed`,
    },
  })

  if (error) {
    errorMessage.value = error.message ?? 'An unknown error occurred'
    processing.value = false
  }
  // If successful, Stripe redirects the user to return_url automatically
}
</script>

<template>
  <UCard :ui="{ header: '!p-0' }">
    <template #header>
      <div class="from-secondary to-secondary/80 rounded-t-xl bg-linear-to-r p-6 text-white">
        <div class="mb-2 flex items-center gap-3">
          <Icon name="i-lucide-lock" class="h-6 w-6" />
          <h1 class="text-2xl font-bold">Secure Payment</h1>
        </div>
        <p class="text-sm text-blue-100">PCI-compliant encryption via Stripe</p>
      </div>
    </template>

    <div class="space-y-6">
      <div ref="paymentElement"></div>

      <UAlert
        v-if="errorMessage"
        icon="i-lucide-alert-circle"
        color="error"
        variant="soft"
        :title="errorMessage"
      />

      <UAlert
        icon="i-lucide-shield-check"
        color="info"
        variant="soft"
        title="Your payment is secure"
        description="We never see or store your credit card details."
      />

      <UButton
        type="button"
        block
        size="xl"
        color="info"
        :loading="processing"
        class="from-secondary to-secondary/80 bg-linear-to-r"
        @click="handlePayment"
      >
        <template #leading>
          <Icon name="i-lucide-lock" class="h-5 w-5" />
        </template>
        Pay ${{ cartStore.totals.total.toFixed(2) }}
      </UButton>
    </div>
  </UCard>
</template>
