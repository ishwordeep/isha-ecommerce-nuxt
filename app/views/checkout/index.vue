<template>
  <div class="grid grid-cols-1 gap-4 min-[960px]:grid-cols-2">
    <UForm
      :state="checkoutStore.formInputs"
      class="flex flex-col gap-4"
      @submit.prevent="onSubmit"
      id="checkout-form"
    >
      <h2 class="text-2xl font-semibold text-black">Checkout</h2>

      <!-- 1. Contact Information -->
      <UPageCard>
        <template #header>
          <div class="flex items-center gap-2">
            <div class="header-number">1</div>
            <span class="header-text">Contact Information</span>
          </div>
        </template>

        <div class="flex flex-col gap-4">
          <UFormField label="Full Name" name="fullName">
            <UInput v-model="checkoutStore.formInputs.name" />
          </UFormField>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <UFormField label="Email" name="email">
              <UInput v-model="checkoutStore.formInputs.email" />
            </UFormField>
            <UFormField label="Phone Number" name="phone">
              <UInput v-model="checkoutStore.formInputs.phone" />
            </UFormField>
          </div>
        </div>
      </UPageCard>

      <!-- 2. Shipping Address (Saved Addresses Only) -->
      <UPageCard>
        <template #header>
          <div class="flex w-full items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="header-number">2</div>
              <span class="header-text">Shipping Address</span>
            </div>
            <UButton
              label="Change"
              size="sm"
              variant="link"
              leadingIcon="i-lucide-pencil"
              @click="openAddressModal = true"
            />
          </div>
        </template>

        <!-- Selected Address Display -->
        <div
          v-if="selectedAddress"
          class="flex flex-col gap-2 rounded-lg bg-gray-50 p-5 dark:bg-gray-900"
        >
          <p class="font-medium text-gray-900 dark:text-white">
            {{ selectedAddress.street }}
            {{ selectedAddress.apartment ? `, ${selectedAddress.apartment}` : '' }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ selectedAddress.city }}, {{ selectedAddress.state }} {{ selectedAddress.zipCode }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ selectedAddress.country }}
          </p>
        </div>

        <!-- No Address Selected -->
        <div v-else class="py-8 text-center">
          <p class="mb-4 text-gray-500">No shipping address selected</p>
          <UButton
            label="Select Address"
            @click="openAddressModal = true"
            leadingIcon="i-lucide-map-pin"
          />
        </div>
      </UPageCard>

      <!-- 3. Payment Method -->
      <UPageCard>
        <template #header>
          <div class="flex items-center gap-2">
            <div class="header-number">3</div>
            <span class="header-text">Payment Method</span>
          </div>
        </template>

        <URadioGroup
          v-model="checkoutStore.formInputs.paymentMethod"
          :items="checkoutMethods"
          variant="card"
          class="gap-3"
        >
          <template #label="{ item }">
            <div class="flex items-center gap-3">
              <span class="text-2xl">{{ item.icon }}</span>
              <span class="font-medium">{{ item.label }}</span>
            </div>
          </template>
        </URadioGroup>
      </UPageCard>
    </UForm>

    <!-- Order Summary -->
    <UPageCard class="h-max min-[960px]:mt-12" title="Order Summary">
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
              <div class="mt-1 flex items-center gap-4 text-sm text-gray-600">
                <span
                  >Color:
                  <span
                    :style="{ backgroundColor: item.color }"
                    class="inline-block h-4 w-4 rounded border"
                  ></span
                ></span>
                <span>Size: {{ item.size }}</span>
              </div>
              <div class="mt-2 flex justify-between">
                <span>Qty: {{ item.quantity }}</span>
                <span class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Totals -->
        <div class="sticky bottom-0 border-t-2 border-gray-900 bg-white pt-4">
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
            class="mt-4 w-full"
            color="primary"
            :disabled="disableButton"
            :loading="isPlacingOrder"
          />
        </div>
      </div>
    </UPageCard>
  </div>

  <!-- Address Selection Modal -->
  <AddressSelectionModal
    v-model:open="openAddressModal"
    :current-address="selectedAddress"
    @select="handleAddressSelect"
  />
</template>

<script lang="ts" setup>
import type { Address } from '~/services/auth.service'
import { useCartStore } from '~/stores/cart.store'
import { useCheckoutStore } from '~/stores/checkout.store'
import AddressSelectionModal from './components/AddressSelectionModal.vue'

const checkoutStore = useCheckoutStore()
const cartStore = useCartStore()
const authStore = useAuthStore()

const openAddressModal = ref(false)

// Only store the full address for display
const selectedAddress = ref<Address | null>(null)
// Only store the ID for submission
const selectedAddressId = ref<string | null>(null)

const isPlacingOrder = ref(false)

const checkoutMethods = ref([
  { label: 'Credit / Debit Card', value: 'card', icon: 'Credit Card' },
  { label: 'PayPal', value: 'paypal', icon: 'PayPal' },
  { label: 'Cash on Delivery', value: 'cod', icon: 'Package' },
])

const totals = computed(() => {
  const subtotal = cartStore.cartTotal
  const shipping = cartStore.carts.length > 0 ? 5 : 0
  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
  }
})

const disableButton = computed(() => {
  return !(
    checkoutStore.formInputs.name &&
    checkoutStore.formInputs.email &&
    checkoutStore.formInputs.phone &&
    selectedAddressId.value && // Must have address selected
    checkoutStore.formInputs.paymentMethod
  )
})

const handleAddressSelect = (address: Address) => {
  selectedAddress.value = address // For display
  selectedAddressId.value = address._id // For submission only
  openAddressModal.value = false
}

// Auto-fill user data + default address
const populateUserData = () => {
  if (!authStore.user) return

  const user = authStore.user

  if (user.name) checkoutStore.formInputs.name = user.name
  if (user.email) checkoutStore.formInputs.email = user.email
  if (user.phone) checkoutStore.formInputs.phone = user.phone

  // Auto-select default address
  const defaultAddr = user.shippingAddresses?.find((a) => a.isDefault)
  if (defaultAddr) {
    handleAddressSelect(defaultAddr)
  }
}

watch(() => authStore.user, populateUserData, { immediate: true })
onMounted(populateUserData)

const onSubmit = async () => {
  if (!selectedAddressId.value) return

  isPlacingOrder.value = true

  const payload = {
    ...checkoutStore.formInputs,
    shippingAddressId: selectedAddressId.value, // Only ID sent
  }

  console.log('Order placed:', payload)

  // Example: await placeOrderApi(payload)
  // Then navigate
  await navigateTo('/checkout/confirmed')
}
</script>

<style scoped>
@reference "tailwindcss";
.header-number {
  @apply flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600;
}
.header-text {
  @apply text-lg font-semibold;
}
</style>
