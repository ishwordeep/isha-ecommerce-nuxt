<template>
  <section class="relative overflow-hidden" :style="{ backgroundColor: '#F6F3E8' }">
    <div class="mx-auto max-w-2xl px-6 py-16 text-center">
      <!-- Heading -->
      <h2 class="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
        Never Miss a Drop
      </h2>

      <!-- Description -->
      <p class="text-md mb-8 text-gray-600 md:text-lg">
        Subscribe to our newsletter and get exclusive access to new collections, special offers, and
        style inspiration.
      </p>

      <!-- Form -->
      <UForm
        :state="{ email }"
        @submit.prevent="subscribe"
        class="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
      >
        <UInput
          v-model="email"
          type="email"
          placeholder="Enter your email"
          required
          :ui="{
            base: 'rounded-xl border-gray-300 px-6 py-4 w-full  focus:ring-0',
          }"
          :class="{ 'border-red-500': error }"
        />
        <button
          type="submit"
          :loading="loading"
          class="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-center font-bold whitespace-nowrap text-white hover:from-blue-600 hover:to-purple-600"
        >
          Subscribe Now
        </button>
      </UForm>

      <!-- Error Message -->
      <p v-if="error" class="mt-2 text-sm text-red-600">
        {{ error }}
      </p>

      <!-- Success Message -->
      <p v-if="success" class="mt-2 text-sm text-green-600">Thank you! You've been subscribed.</p>

      <!-- Social Proof -->
      <p class="mt-4 text-sm text-gray-500">Join 50,000+ fashion enthusiasts already subscribed</p>
    </div>
  </section>
</template>

<script setup lang="ts">
const email = ref('')
const loading = ref(false)
const success = ref(false)
const error = ref('')
const toast = useToast()
const subscribe = async () => {
  error.value = ''
  success.value = false

  if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
    error.value = 'Please enter a valid email address'
    return
  }

  loading.value = true

  try {
    // Replace with your real API endpoint
    console.log(`Subscribing ${email.value} to newsletter...`)
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call
    toast.add({
      color: 'success',
      title: 'Subscribed!',
      description: `You've successfully subscribed to our newsletter.`,
    })
    success.value = true
    email.value = ''
  } catch (err: unknown) {
    toast.add({
      color: 'error',
      title: 'Subscription Failed',
      description: 'Unable to subscribe. Please try again later.',
    })
    console.log(err)
    error.value = 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
