<template>
  <UiLoader v-if="cartStore.isFetching" />

  <div class="grid grid-cols-1 gap-4 min-[960px]:grid-cols-2" v-else>
    <UForm
      :state="checkoutStore.formInputs"
      class="flex flex-col gap-4"
      @submit.prevent="onSubmit"
      id="checkout-form"
    >
      <!-- 1. Contact Information -->
      <UPageCard
        :ui="{
          header: '!mb-0',
        }"
      >
        <template #header>
          <div class="flex items-center gap-2">
            <div class="header-number">1</div>
            <div class="flex flex-col">
              <span class="header-text">Contact Information</span>
              <span class="text-sm text-gray-600">How can we reach you?</span>
            </div>
          </div>
        </template>

        <div class="flex flex-col gap-4">
          <UFormField label="Full Name" name="fullName" required>
            <UInput v-model="checkoutStore.formInputs.name" />
          </UFormField>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <UFormField label="Email" name="email" required>
              <UInput v-model="checkoutStore.formInputs.email" />
            </UFormField>
            <UFormField label="Phone Number" name="phone" required>
              <UInput v-model="checkoutStore.formInputs.phone" />
            </UFormField>
          </div>
          <UFormField label="Notes" name="notes">
            <UTextarea v-model="checkoutStore.formInputs.notes" :rows="3" />
          </UFormField>
        </div>
      </UPageCard>

      <!-- 2. Shipping Address (Saved Addresses Only) -->
      <UPageCard
        :ui="{
          header: 'justify-between items-center flex gap-4 w-full !mb-0',
        }"
      >
        <template #header>
          <div class="flex items-center gap-2">
            <div class="header-number">2</div>
            <div class="flex flex-col">
              <span class="header-text">Shipping Address <span class="text-error">*</span></span>
              <span class="text-sm text-gray-600">Select a saved address for shipping</span>
            </div>
          </div>
          <UButton
            label="Change"
            size="sm"
            variant="link"
            leadingIcon="i-lucide-pencil"
            @click="openAddressModal = true"
          />
        </template>

        <!-- Selected Address Display -->
        <div
          v-if="authStore.selectedAddress"
          class="flex flex-col gap-2 rounded-lg bg-gray-50 dark:bg-gray-900"
        >
          <p class="font-medium text-gray-900 dark:text-white">
            {{ authStore.selectedAddress.street }}
            {{
              authStore.selectedAddress.apartment ? `, ${authStore.selectedAddress.apartment}` : ''
            }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ authStore.selectedAddress.city }}, {{ authStore.selectedAddress.state }}
            {{ authStore.selectedAddress.zipCode }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ authStore.selectedAddress.country }}
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
      <UPageCard
        :ui="{
          header: '!mb-0',
        }"
      >
        <template #header>
          <div class="flex items-center gap-2">
            <div class="header-number">3</div>
            <div class="flex flex-col">
              <span class="header-text">Payment Method <span class="text-error">*</span></span>
              <span class="text-sm text-gray-600">Select a Payment Method.</span>
            </div>
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
              <UIcon :name="item.icon" class="h-6 w-6" />
              <span class="font-medium">{{ item.label }}</span>
            </div>
          </template>
        </URadioGroup>
      </UPageCard>
    </UForm>

    <!-- Order Summary -->
    <OrderSummary :isPlacingOrder="isPlacingOrder" />
  </div>

  <!-- Address Selection Modal -->
  <AddressSelectionModal v-model:open="openAddressModal" @select="handleAddressSelect" />
</template>

<script lang="ts" setup>
import type { Address } from '~/services/auth.service'
import { useCartStore } from '~/stores/cart.store'
import { useCheckoutStore } from '~/stores/checkout.store'
import AddressSelectionModal from './components/AddressSelectionModal.vue'
import OrderSummary from './components/OrderSummary.vue'

const checkoutStore = useCheckoutStore()
const cartStore = useCartStore()
const authStore = useAuthStore()
const toast = useToast()
const openAddressModal = ref(false)

const isPlacingOrder = ref(false)

const checkoutMethods = ref([
  { label: 'Credit / Debit Card', value: 'card', icon: 'i-lucide-credit-card' },
  { label: 'Apple Pay', value: 'apple_pay', icon: 'i-simple-icons-applepay' },
])

const handleAddressSelect = (address: Address) => {
  authStore.selectedAddress = address // For display
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
onMounted(() => {
  populateUserData()
})

watch(
  () => cartStore.isFetching,
  (newVal) => {
    if (!newVal && !cartStore.carts?.length) {
      navigateTo('/products')
    }
  }
)

const onSubmit = async () => {
  if (!authStore.selectedAddress) return
  const selectedAddress = authStore.selectedAddress
  const { _id, isDefault, ...shippingAddress } = selectedAddress

  const products = cartStore.carts?.map(({ _id, discount, ...product }) => product)
  isPlacingOrder.value = true

  const payload = {
    ...checkoutStore.formInputs,
    shippingAddress: shippingAddress,
    items: products || [],
    grandTotal: cartStore.totals.total,
    subtotal: cartStore.totals.subtotal,
    discountTotal: 0,
    shippingFee: cartStore.totals.shipping,
  }
  const response = await checkoutStore.saveOrder(payload)
  // await axiosService.post(`/order/${response?.data?.data?._id}/payment-intent`, {})
  if (response?.data?.success) {
    await navigateTo(`/checkout/${response?.data?.data?._id}/confirmed`)
  } else {
    toast.add({
      color: 'error',
      title: 'Order Failed',
      description:
        response?.data?.message || 'There was an issue placing your order. Please try again.',
    })
    isPlacingOrder.value = false
  }
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
