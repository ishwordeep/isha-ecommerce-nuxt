<template>
  <div class="grid grid-cols-1 gap-4 min-[960px]:grid-cols-2">
    <UForm
      :state="checkoutStore.formInputs"
      class="flex flex-col gap-4"
      @submit.prevent="onSubmit"
      id="checkout-form"
    >
      <h2 class="text-2xl font-semibold text-black">Checkout</h2>
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

      <UPageCard>
        <template #header>
          <div class="flex items-center gap-2">
            <div class="header-number">2</div>
            <span class="header-text">Shipping Address</span>
          </div>
        </template>

        <div class="flex flex-col gap-4">
          <UFormField label="Address" name="address">
            <UInput v-model="checkoutStore.formInputs.address" />
          </UFormField>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <UFormField label="City" name="city">
              <UInput v-model="checkoutStore.formInputs.city" />
            </UFormField>

            <UFormField label="Zip Code" name="zipCode">
              <UInput v-model="checkoutStore.formInputs.zipCode" />
            </UFormField>
          </div>
        </div>
      </UPageCard>

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
          :ui="{ label: 'items-center', fieldset: 'gap-4', item: 'items-center' }"
        >
          <template #label="{ item }">
            <div class="flex items-center gap-2">
              <span :class="item.value === 'card' ? '-mt-2' : ''" class="text-lg">{{
                item.icon
              }}</span>
              <span class="font-medium">{{ item.label }}</span>
            </div>
          </template>
        </URadioGroup>
      </UPageCard>
    </UForm>
    <UPageCard class="h-max min-[960px]:mt-12" title="Order Summary">
      <div class="relative flex max-h-[90dvh] flex-col gap-2 overflow-y-auto pr-2 sm:max-h-[57dvh]">
        <div
          v-for="item in cartStore.carts"
          :key="item.productId"
          class="border-b-default mt-1 flex items-start gap-4 border-b pb-4"
        >
          <div class="border-default aspect-square w-[80px] shrink rounded-md border">
            <NuxtImg
              :src="item.image"
              alt="Product Image"
              class="h-full w-full rounded-md object-cover"
              v-if="item.image"
            />
          </div>
          <div class="flex flex-1 flex-col gap-1">
            <h3 class="line-clamp-2 text-lg font-semibold text-black">{{ item.name }}</h3>
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium">Color:</span>
              <span
                :style="{ backgroundColor: item.color }"
                class="border-default h-5 w-5 rounded-sm border"
              ></span>
              <span class="text-sm font-medium">Size:</span>
              <span class="text-sm">{{ item.size }}</span>
            </div>
            <div class="flex items-center gap-2"></div>
            <div
              class="flex items-start justify-between gap-2 max-sm:flex-col max-sm:text-sm sm:items-center"
            >
              <span class="text-sm"> Qty: 2 </span>

              <span class="text-sm">${{ item.price.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <div
          class="border-t-default sticky bottom-0 mt-4 flex flex-col gap-2 border-t-2 bg-white pt-4"
        >
          <div class="flex items-center justify-between">
            <span>Subtotal:</span>
            <span class="text-lg"> ${{ totals.subtotal.toFixed(2) }} </span>
          </div>
          <div class="flex items-center justify-between">
            <span>Shipping:</span>
            <span class="text-lg">${{ totals.shipping.toFixed(2) }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="font-bold text-black">Total:</span>
            <span class="text-primary text-lg font-bold">${{ totals.total.toFixed(2) }}</span>
          </div>

          <UButton
            type="submit"
            form="checkout-form"
            label="Place Order"
            class="mt-4"
            color="primary"
            :ui="{
              label: 'w-full text-center',
            }"
            to="/checkout/confirmed"
            viewTransition
            :disabled="disableButton"
          />
        </div>
      </div>
    </UPageCard>
  </div>
</template>

<script lang="ts" setup>
import { useCartStore } from '~/stores/cart.store'
import { useCheckoutStore } from '~/stores/checkout.store'
const checkoutStore = useCheckoutStore()
const cartStore = useCartStore()
const checkoutMethods = ref([
  { label: 'Credit / Debit Card', value: 'card', icon: '💳' },
  { label: 'PayPal', value: 'paypal', icon: '💰️' },
  { label: 'Cash on Delivery', value: 'cod', icon: '📦' },
])

const totals = computed(() => {
  return {
    subtotal: cartStore.cartTotal,
    shipping: (cartStore.carts?.length || 0) > 0 ? 5 : 0,
    total: cartStore.cartTotal + ((cartStore.carts?.length || 0) > 0 ? 5 : 0),
  }
})

const disableButton = ref(true)

watch(
  () => checkoutStore.formInputs,
  (newVal) => {
    disableButton.value = !(
      newVal.name &&
      newVal.email &&
      newVal.phone &&
      newVal.address &&
      newVal.city &&
      newVal.zipCode &&
      newVal.paymentMethod
    )
  },
  { deep: true }
)

const onSubmit = () => {
  // Handle form submission logic here
  console.log('Form submitted:', checkoutStore.formInputs)
}

const cartData = ref([
  {
    id: 1,
    name: 'Classic Denim Jacket',
    price: 89.99,
    image: '🧥',
    category: 'Jackets',
    rating: 4.5,
    reviews: 128,
    colors: ['#4A5568', '#000000', '#63B3ED'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Premium quality denim jacket with a classic fit. Perfect for casual wear.',
    collection: 'new-arrivals',
  },

  {
    id: 2,
    name: 'Elegant Black Dress',
    price: 120.0,
    image: '👗',
    category: 'Dresses',
    rating: 4.7,
    reviews: 89,
    colors: ['#000000', '#1E3A8A', '#EF4444'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Elegant dress perfect for formal occasions and evening events.',
    collection: 'featured',
  },
])
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
