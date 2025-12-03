<template>
  <div class="mx-auto max-w-4xl py-4 lg:py-12">
    <UCard>
      <div class="mb-8 text-center">
        <!-- Red/X icon instead of green check -->
        <div
          class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20"
        >
          <UIcon name="i-heroicons-x-circle" class="h-12 w-12 text-red-600 dark:text-red-400" />
        </div>

        <h2 class="mb-4 text-3xl font-bold text-red-600 dark:text-red-400">Order Failed</h2>

        <div class="mx-auto mt-6 max-w-sm space-y-3 text-sm text-gray-500 dark:text-gray-400">
          <p class="text-left">Common reasons:</p>
          <ul class="space-y-1 text-left">
            <li>• Insufficient funds or card declined</li>
            <li>• Incorrect card details</li>
            <li>• Payment method not supported</li>
            <li>• Temporary issue — please try again</li>
          </ul>
        </div>
      </div>

      <USeparator class="mb-8" color="neutral" />

      <!-- Action buttons -->
      <div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <UButton size="lg" color="primary" @click="goBackToCheckout" view-transition>
          Try Again
        </UButton>

        <UButton size="lg" variant="outline" @click="goToShopping" view-transition>
          Continue Shopping
        </UButton>
      </div>

      <div class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Need help? <NuxtLink to="/contact" class="text-primary underline">Contact Support</NuxtLink>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const orderStore = useOrderStore()

const goBackToCheckout = () => {
  orderStore.orderFailed = false
  navigateTo('/checkout')
}

const goToShopping = () => {
  orderStore.orderFailed = false
  navigateTo('/products')
}

onMounted(() => {
  if (!orderStore.orderFailed) {
    navigateTo('/')
  }
})
</script>
