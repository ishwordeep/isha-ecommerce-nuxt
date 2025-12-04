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
          <UFormField label="Notes" name="notes">
            <UTextarea v-model="checkoutStore.formInputs.notes" :rows="3" />
          </UFormField>
        </div>
      </UPageCard>

      <!-- 2. Shipping Address (Saved Addresses Only) -->
      <UPageCard
        :ui="{
          header: 'justify-between items-center flex gap-4 w-full',
        }"
      >
        <template #header>
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
        </template>

        <!-- Selected Address Display -->
        <div
          v-if="authStore.selectedAddress"
          class="flex flex-col gap-2 rounded-lg bg-gray-50 p-5 dark:bg-gray-900"
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
              <UIcon :name="item.icon" class="h-6 w-6" />
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
        <div class="sticky bottom-0 border-t border-gray-600 bg-white pt-4">
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>${{ totals.subTotal.toFixed(2) }}</span>
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
          />
        </div>
      </div>
    </UPageCard>
  </div>

  <!-- Address Selection Modal -->
  <AddressSelectionModal v-model:open="openAddressModal" @select="handleAddressSelect" />
</template>

<script lang="ts" setup>
import type { Address } from '~/services/auth.service'
import { useCartStore } from '~/stores/cart.store'
import { useCheckoutStore } from '~/stores/checkout.store'
import AddressSelectionModal from './components/AddressSelectionModal.vue'

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

const totals = computed(() => {
  const subTotal = cartStore.cartTotal
  const shipping = (cartStore.carts?.length || 0) > 0 ? 5 : 0
  return {
    subTotal,
    shipping,
    total: subTotal + shipping,
  }
})

const disableButton = computed(() => {
  return !(
    checkoutStore.formInputs.name &&
    checkoutStore.formInputs.email &&
    checkoutStore.formInputs.phone &&
    checkoutStore.formInputs.paymentMethod
  )
})

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
onMounted(populateUserData)

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
    grandTotal: totals.value.total,
    subtotal: totals.value.subTotal,
    discountTotal: 0,
    shippingFee: totals.value.shipping,
  }
  const response = await checkoutStore.saveOrder(payload)
  if (response?.data?.success) {
    await navigateTo('/checkout/confirmed')
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
