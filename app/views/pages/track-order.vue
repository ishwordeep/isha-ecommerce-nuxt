<script setup>
const trackingInput = ref('')
const trackedOrder = ref(null)

// Sample data (in real app, fetch from API)
const orderData = {
  'ORD-12345': {
    orderId: 'ORD-12345',
    orderDate: '2025-12-05',
    estimatedDelivery: '2025-12-10',
    currentStatus: 'in_transit',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      address: '123 Main Street, Apt 4B, New York, NY 10001',
    },
    items: [
      {
        name: 'Premium Cotton T-Shirt',
        qty: 2,
        price: 29.99,
        image: '👕',
        color: 'Blue',
        size: 'M',
      },
      { name: 'Denim Jeans', qty: 1, price: 79.99, image: '👖', color: 'Dark Blue', size: '32' },
    ],
    total: 139.97,
    shippingMethod: 'Standard Shipping',
    trackingNumber: 'TRK123456789',
    carrier: 'FedEx',
    timeline: [
      {
        status: 'ordered',
        label: 'Order Placed',
        description: 'Your order has been confirmed',
        date: '2025-12-05',
        time: '10:30 AM',
        completed: true,
      },
      {
        status: 'processing',
        label: 'Processing',
        description: 'We are preparing your items',
        date: '2025-12-05',
        time: '02:15 PM',
        completed: true,
      },
      {
        status: 'shipped',
        label: 'Shipped',
        description: 'Your package is on the way',
        date: '2025-12-06',
        time: '09:00 AM',
        completed: true,
      },
      {
        status: 'in_transit',
        label: 'In Transit',
        description: 'Package is en route to your location',
        date: '2025-12-08',
        time: '11:30 AM',
        completed: true,
        current: true,
      },
      {
        status: 'out_for_delivery',
        label: 'Out for Delivery',
        description: 'Package is out for delivery',
        date: '',
        time: '',
        completed: false,
      },
      {
        status: 'delivered',
        label: 'Delivered',
        description: 'Package has been delivered',
        date: '',
        time: '',
        completed: false,
      },
    ],
  },
}

const handleTrackOrder = () => {
  const orderId = trackingInput.value.trim().toUpperCase()
  if (orderId && orderData[orderId]) {
    trackedOrder.value = orderData[orderId]
  } else {
    trackedOrder.value = null
    useToast().add({
      title: 'Order Not Found',
      description: 'Please check your order ID and try again.',
      color: 'yellow',
      icon: 'i-heroicons-exclamation-triangle',
    })
  }
}

const getStatusIcon = (status) => {
  const icons = {
    ordered: 'i-heroicons-cube',
    processing: 'i-heroicons-archive-box',
    shipped: 'i-heroicons-truck',
    in_transit: 'i-heroicons-truck',
    out_for_delivery: 'i-heroicons-map-pin',
    delivered: 'i-heroicons-check-circle',
  }
  return icons[status] || 'i-heroicons-cube'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const formatShortDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const section = {
  title: 'Track Your Order',
  description: 'Enter your order ID to get real-time updates on your package delivery',
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-[#F6F3E8] px-6 py-16 text-center">
      <div class="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
        <UIcon name="i-heroicons-cube" class="h-8 w-8 text-white" />
      </div>
      <h1 class="mb-4 text-5xl font-bold text-gray-900 md:text-6xl dark:text-white">
        Track Your Order
      </h1>
      <p class="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
        Enter your order ID to get real-time updates on your package delivery
      </p>

      <!-- Decorative Blobs -->
      <div
        class="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-linear-to-br from-purple-200/40 to-pink-200/40 blur-3xl"
      />
      <div
        class="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-linear-to-tr from-blue-200/40 to-green-200/40 blur-3xl"
      />
    </div>

    <div class="mt-12">
      <!-- Search Box -->
      <div class="mx-auto mb-12">
        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold">Enter Your Order ID</h2>
          </template>

          <div class="flex flex-col gap-4 sm:flex-row">
            <UInput
              v-model="trackingInput"
              size="xl"
              placeholder="e.g., ORD-12345"
              icon="i-heroicons-magnifying-glass"
              @keydown.enter="handleTrackOrder"
              class="flex-1"
            />
            <UButton
              size="xl"
              color="primary"
              label="Track"
              icon="i-heroicons-magnifying-glass"
              @click="handleTrackOrder"
            />
          </div>

          <template #footer>
            <p class="text-sm text-gray-500">
              You can find your order ID in the confirmation email we sent you
            </p>
          </template>
        </UCard>
      </div>

      <!-- Tracking Results -->
      <div v-if="trackedOrder" class="space-y-8">
        <!-- Order Header -->
        <div>
          <div class="rounded-t-xl bg-linear-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div
              class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center"
            >
              <div>
                <h2 class="text-3xl font-bold">Order {{ trackedOrder.orderId }}</h2>
                <p class="opacity-90">Ordered on {{ formatDate(trackedOrder.orderDate) }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm opacity-90">Estimated Delivery</p>
                <p class="text-2xl font-bold">
                  {{ formatShortDate(trackedOrder.estimatedDelivery) }}
                </p>
              </div>
            </div>
            <div class="mt-4 flex items-center gap-2">
              <UIcon name="i-heroicons-truck" class="h-5 w-5" />
              <span class="font-medium"
                >{{ trackedOrder.carrier }} • {{ trackedOrder.trackingNumber }}</span
              >
            </div>
          </div>

          <!-- Current Status -->
          <div
            class="rounded-b-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20"
          >
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                <UIcon name="i-heroicons-truck" class="h-7 w-7 text-white" />
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Current Status</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">
                  {{ trackedOrder.timeline.find((t) => t.current)?.label || 'Processing' }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ trackedOrder.timeline.find((t) => t.current)?.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <UCard>
          <h3 class="mb-8 text-2xl font-bold">Delivery Timeline</h3>
          <div class="relative">
            <div class="absolute top-4 bottom-4 left-6 w-0.5 bg-gray-200 dark:bg-gray-700" />
            <div class="space-y-8">
              <div
                v-for="(step, idx) in trackedOrder.timeline"
                :key="idx"
                class="relative flex gap-2 sm:gap-6"
              >
                <div
                  class="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all"
                  :class="[
                    step.current
                      ? 'animate-pulse bg-blue-600'
                      : step.completed
                        ? 'bg-success'
                        : 'bg-gray-300 dark:bg-gray-600',
                  ]"
                >
                  <UIcon :name="getStatusIcon(step.status)" class="h-6 w-6 text-white" />
                </div>

                <UCard class="flex-1" :ui="{ body: '!p-4' }">
                  <div class="mb-2 flex items-start justify-between">
                    <div>
                      <h4
                        class="text-lg font-bold"
                        :class="step.completed ? 'text-gray-900 dark:text-white' : 'text-gray-500'"
                      >
                        {{ step.label }}
                      </h4>
                      <p
                        class="text-sm"
                        :class="
                          step.completed ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400'
                        "
                      >
                        {{ step.description }}
                      </p>
                    </div>
                    <UChip v-if="step.current" color="primary" size="xs">Current</UChip>
                  </div>

                  <div
                    v-if="step.date"
                    class="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <span class="flex items-center gap-1">
                      <UIcon name="i-heroicons-calendar" class="h-4 w-4" />
                      {{ formatShortDate(step.date) }}
                    </span>
                    <span v-if="step.time" class="flex items-center gap-1">
                      <UIcon name="i-heroicons-clock" class="h-4 w-4" />
                      {{ step.time }}
                    </span>
                  </div>
                </UCard>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Order Items + Address & Actions -->
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <!-- Items -->
          <UCard>
            <template #header>
              <h3 class="text-xl font-bold">Order Items</h3>
            </template>

            <div class="space-y-6">
              <div v-for="(item, i) in trackedOrder.items" :key="i" class="flex gap-4">
                <div
                  class="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 p-4 text-4xl dark:bg-gray-800"
                >
                  {{ item.image }}
                </div>
                <div class="flex-1">
                  <h4 class="font-semibold">{{ item.name }}</h4>
                  <p class="text-sm text-gray-500">
                    {{ item.color }} • Size {{ item.size }} • Qty: {{ item.qty }}
                  </p>
                  <p class="mt-2 font-bold">${{ (item.price * item.qty).toFixed(2) }}</p>
                </div>
              </div>
            </div>

            <template #footer>
              <div class="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span class="text-primary">${{ trackedOrder.total.toFixed(2) }}</span>
              </div>
            </template>
          </UCard>

          <!-- Right Column -->
          <div class="space-y-8">
            <!-- Delivery Address -->
            <UCard>
              <template #header>
                <h3 class="text-xl font-bold">Delivery Address</h3>
              </template>
              <div class="space-y-4 text-sm">
                <div class="flex items-start gap-3">
                  <UIcon name="i-heroicons-map-pin" class="mt-0.5 h-5 w-5 text-gray-500" />
                  <div>
                    <p class="font-medium">{{ trackedOrder.customer.name }}</p>
                    <p class="text-gray-600 dark:text-gray-400">
                      {{ trackedOrder.customer.address }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <UIcon name="i-heroicons-phone" class="h-5 w-5 text-gray-500" />
                  <span>{{ trackedOrder.customer.phone }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <UIcon name="i-heroicons-envelope" class="h-5 w-5 text-gray-500" />
                  <span>{{ trackedOrder.customer.email }}</span>
                </div>
              </div>
            </UCard>

            <!-- Actions -->
            <UCard>
              <template #header>
                <h3 class="text-xl font-bold">Need Help?</h3>
              </template>
              <div class="grid grid-cols-1 gap-3">
                <UButton block variant="outline" icon="i-heroicons-arrow-down-tray"
                  >Download Invoice</UButton
                >
                <UButton block variant="outline" icon="i-heroicons-printer">Print Receipt</UButton>
                <UButton block color="primary" icon="i-heroicons-chat-bubble-left-right"
                  >Contact Support</UButton
                >
              </div>
            </UCard>
          </div>
        </div>
      </div>

      <!-- FAQ Section when no order tracked -->
      <div v-else class="mx-auto mt-12">
        <UCard>
          <template #header>
            <h3 class="text-xl font-bold">Frequently Asked Questions</h3>
          </template>
          <UAccordion
            :items="[
              { label: 'Where can I find my order ID?', slot: 'faq1' },
              { label: 'How long does delivery take?', slot: 'faq2' },
              { label: 'What if my tracking isn\'t updating?', slot: 'faq3' },
            ]"
          >
            <template #faq1>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Your order ID was sent to your email when you placed the order. It starts with
                "ORD-" followed by numbers.
              </p>
            </template>
            <template #faq2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days.
              </p>
            </template>
            <template #faq3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Tracking information can take 24-48 hours to update. If you still don't see updates,
                contact our support team.
              </p>
            </template>
          </UAccordion>
        </UCard>
      </div>
    </div>
  </div>
</template>
