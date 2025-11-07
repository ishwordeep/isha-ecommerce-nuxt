<template>
  <UForm
    :state="checkoutStore.formInputs"
    class="flex flex-col gap-4"
    @submit.prevent="onSubmit"
    id="checkout-form"
  >
    <h2 class="text-2xl font-semibold text-black">Checkout</h2>
    <UPageCard title="Shipping Information">
      <div :state="{}" class="flex flex-col gap-4">
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

    <UPageCard title="Payment Method">
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

    <UPageCard title="Order Summary">
      <div class="flex flex-col gap-2">
        <div
          v-for="item in cartData"
          :key="item.id"
          class="border-b-default mt-1 flex items-start gap-4 border-b pb-4"
        >
          <div class="text-5xl">{{ item.image }}</div>
          <div class="flex flex-1 flex-col gap-1">
            <h3 class="line-clamp-2 text-lg font-semibold text-black">{{ item.name }}</h3>
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium">Color:</span>
              <span
                :style="{ backgroundColor: item.colors[0] }"
                class="border-default h-5 w-5 rounded-sm border"
              ></span>
              <span class="text-sm font-medium">Size:</span>
              <span class="text-sm">{{ item.sizes[0] }}</span>
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

        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <span>Subtotal:</span>
            <span class="text-lg">
              ${{ cartData.reduce((total, item) => total + item.price, 0).toFixed(2) }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span>Shipping:</span>
            <span class="text-lg">$5</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="font-bold text-black">Total:</span>
            <span class="text-primary text-lg font-bold"
              >${{ cartData.reduce((total, item) => total + item.price + 5, 0).toFixed(2) }}</span
            >
          </div>

          <UButton
            type="submit"
            form="checkout-form"
            label="Place Order"
            class="mt-4"
            color="primary"
            :ui="{
              label: 'w-full text-center',
              base: 'py-2 sm:py-3',
            }"
            to="/checkout/confirmed"
            viewTransition
          />
        </div>
      </div>
    </UPageCard>
  </UForm>
</template>

<script lang="ts" setup>
import { useCheckoutStore } from '~/stores/checkout.store'

const checkoutStore = useCheckoutStore()

const checkoutMethods = ref([
  { label: 'Credit / Debit Card', value: 'card', icon: '💳' },
  { label: 'PayPal', value: 'paypal', icon: '💰️' },
  { label: 'Cash on Delivery', value: 'cod', icon: '📦' },
])

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
