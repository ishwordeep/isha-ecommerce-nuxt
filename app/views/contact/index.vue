<script setup lang="ts">
import axiosService from '~/services/axios.service'
import type { SettingResponse } from '~/services/setting.service'

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})
const toast = useToast()
const submitted = ref(false)
const { setting } = useSettingStore()
const subjects = [
  { label: 'General Inquiry', value: 'general' },
  { label: 'Order Status', value: 'order' },
  { label: 'Returns & Exchanges', value: 'return' },
  { label: 'Product Question', value: 'product' },
  { label: 'Feedback', value: 'feedback' },
  { label: 'Other', value: 'other' },
]

const formatLocation = (setting: SettingResponse) => {
  if (!setting) return 'New York, NY 10001'

  const parts = []
  if (setting.city) parts.push(setting.city)
  if (setting.state) {
    if (setting.city) parts.push(', ')
    parts.push(setting.state)
  }
  if (setting.postalCode) parts.push(` ${setting.postalCode}`)

  return parts.length ? parts.join('') : 'New York, NY 10001'
}

const handleSubmit = async () => {
  submitted.value = true
  try {
    const response = await axiosService.post('/contact', formData)
    if (response.data?.success) {
      toast.add({
        color: 'success',
        title: 'Message Sent',
        description: 'Thank you for reaching out! We will get back to you shortly.',
      })
      formData.name = ''
      formData.email = ''
      formData.phone = ''
      formData.subject = ''
      formData.message = ''
    }
  } catch (error) {
    toast.add({
      color: 'error',
      title: 'Submission Failed',
      description: 'There was an issue sending your message. Please try again later.',
    })
  } finally {
    submitted.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-[#F6F3E8]">
      <div class="px-6 py-16 text-center">
        <h1 class="mb-4 text-5xl font-bold text-gray-900 md:text-6xl">Get in Touch</h1>
        <p class="mx-auto max-w-2xl text-xl text-gray-600">
          Have a question or feedback? We'd love to hear from you. Send us a message and we'll
          respond as soon as possible.
        </p>
      </div>
      <div
        class="absolute top-0 right-0 h-64 w-64 rounded-full bg-linear-to-br from-blue-200/30 to-purple-200/30 blur-3xl"
      />
      <div
        class="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-linear-to-tr from-orange-200/30 to-pink-200/30 blur-3xl"
      />
    </div>

    <div class="grid grid-cols-1 gap-8 py-6 lg:grid-cols-3">
      <!-- Contact Information Sidebar -->
      <div class="space-y-6">
        <!-- Email Card -->
        <UCard class="hover:shadow-lg">
          <template #header>
            <div class="header-icon-container bg-blue-100">
              <UIcon name="i-heroicons-envelope" class="header-icon text-blue-600" />
            </div>
          </template>
          <h3 class="mb-2 text-lg font-bold text-gray-900">Email Us</h3>
          <p class="mb-3 text-sm text-gray-600">Send us an email anytime</p>
          <a
            :href="`mailto:${setting?.email || 'support@fashionstore.com'}`"
            class="text-primary-600 hover:text-primary-700 font-medium"
          >
            {{ setting?.email || 'support@fashionstore.com' }}
          </a>
        </UCard>

        <!-- Phone Card -->
        <UCard class="hover:shadow-lg">
          <template #header>
            <div class="header-icon-container bg-green-100">
              <UIcon name="i-heroicons-phone" class="header-icon text-green-600" />
            </div>
          </template>
          <h3 class="mb-2 text-lg font-bold text-gray-900">Call Us</h3>
          <p class="mb-3 text-sm text-gray-600">Contact our support team by phone</p>
          <a
            :href="`tel:${setting?.phone || '+1234567890'}`"
            class="text-primary-600 hover:text-primary-700 font-medium"
          >
            {{ setting?.phone || '+1 (234) 567-890' }}
          </a>
        </UCard>

        <!-- Address Card -->
        <UCard class="hover:shadow-lg">
          <template #header>
            <div class="header-icon-container bg-purple-100">
              <UIcon name="i-heroicons-map-pin" class="header-icon text-purple-600" />
            </div>
          </template>
          <h3 class="mb-2 text-lg font-bold text-gray-900">Visit Us</h3>
          <p class="mb-3 text-sm text-gray-600">Come say hello at our office</p>
          <address class="text-gray-700 not-italic">
            {{ setting?.address || '123 Fashion Street' }}<br />
            {{ formatLocation(setting as SettingResponse) }}<br />
            United States
          </address>
        </UCard>

        <!-- Hours Card -->
        <!-- <UCard class="hover:shadow-lg">
          <template #header>
            <div class="header-icon-container bg-orange-100">
              <UIcon name="i-heroicons-clock" class="header-icon text-orange-600" />
            </div>
          </template>
          <h3 class="mb-2 text-lg font-bold text-gray-900">Business Hours</h3>
          <div class="space-y-2 text-sm text-gray-700">
            <div class="flex justify-between">
              <span>Monday - Friday</span>
              <span class="font-medium">9:00 AM - 6:00 PM</span>
            </div>
            <div class="flex justify-between">
              <span>Saturday</span>
              <span class="font-medium">10:00 AM - 4:00 PM</span>
            </div>
            <div class="flex justify-between">
              <span>Sunday</span>
              <span class="font-medium">Closed</span>
            </div>
          </div>
        </UCard> -->

        <!-- Social Media Card -->
        <UCard class="bg-linear-to-br from-blue-600 to-purple-600 text-white hover:shadow-lg">
          <template #header>
            <h3 class="mb-2 text-lg font-bold">Follow Us</h3>
            <p class="mb-2 text-sm text-blue-100">Stay connected on social media</p>
          </template>
          <div class="flex gap-1">
            <a
              v-if="setting?.facebook"
              :href="setting?.facebook || '#'"
              class="social-icon-container bg-white/20 transition-colors hover:bg-white/30"
              target="_blank"
            >
              <UIcon name="i-simple-icons-facebook" class="social-icon" />
            </a>
            <a
              v-if="setting?.instagram"
              :href="setting?.instagram || '#'"
              class="social-icon-container bg-white/20 transition-colors hover:bg-white/30"
              target="_blank"
            >
              <UIcon name="i-simple-icons-instagram" class="social-icon" />
            </a>

            <a
              :href="setting?.tiktok || '#'"
              class="social-icon-container bg-white/20 transition-colors hover:bg-white/30"
              target="_blank"
            >
              <UIcon name="i-simple-icons-tiktok" class="social-icon" />
            </a>
          </div>
        </UCard>
      </div>

      <!-- Contact Form -->
      <div class="lg:col-span-2">
        <UCard>
          <h2 class="mb-2 text-3xl font-bold text-gray-900">Send us a Message</h2>
          <p class="mb-8 text-gray-600">
            Fill out the form below and we'll get back to you within 24 hours
          </p>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <UFormGroup label="Full Name" required>
                <UInput v-model="formData.name" placeholder="John Doe" size="lg" />
              </UFormGroup>

              <UFormGroup label="Email Address" required>
                <UInput
                  v-model="formData.email"
                  type="email"
                  placeholder="john@example.com"
                  size="lg"
                />
              </UFormGroup>
            </div>

            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <UFormGroup label="Phone Number">
                <UInput
                  v-model="formData.phone"
                  type="tel"
                  placeholder="+1 (234) 567-890"
                  size="lg"
                />
              </UFormGroup>

              <UFormGroup label="Subject" required>
                <USelect
                  v-model="formData.subject"
                  :items="subjects"
                  placeholder="Select a subject"
                  size="lg"
                />
              </UFormGroup>
            </div>

            <UFormGroup label="Message" required>
              <UTextarea
                v-model="formData.message"
                placeholder="Tell us how we can help you..."
                :rows="6"
                size="lg"
              />
            </UFormGroup>

            <div class="mt-4 flex items-start gap-3">
              <UCheckbox id="agree" />
              <label for="agree" class="text-sm text-gray-600">
                I agree to the
                <a href="#" class="text-primary-600 font-medium hover:underline">Privacy Policy</a>
                and
                <a href="#" class="text-primary-600 font-medium hover:underline"
                  >Terms of Service</a
                >
              </label>
            </div>

            <UButton
              type="submit"
              size="xl"
              block
              class="bg-linear-to-r from-blue-600 to-purple-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <UIcon name="i-heroicons-paper-airplane" class="mr-2 h-5 w-5 -rotate-45" />
              Send Message
            </UButton>
          </form>
        </UCard>

        <!-- Quick FAQ Links -->
        <UCard class="mt-8 border border-blue-200 bg-blue-50">
          <template #header>
            <h3 class="mb-3 font-bold text-gray-900">Need Quick Answers?</h3>
            <p class="mb-4 text-sm text-gray-600">
              Check out our FAQ page for instant answers to common questions:
            </p>
          </template>
          <div class="grid grid-cols-2 gap-3">
            <a
              href="#"
              class="text-primary-600 hover:text-primary-700 flex items-center gap-1 text-sm font-medium"
            >
              → Shipping Information
            </a>
            <a
              href="#"
              class="text-primary-600 hover:text-primary-700 flex items-center gap-1 text-sm font-medium"
            >
              → Return Policy
            </a>
            <a
              href="#"
              class="text-primary-600 hover:text-primary-700 flex items-center gap-1 text-sm font-medium"
            >
              → Size Guide
            </a>
            <a
              href="#"
              class="text-primary-600 hover:text-primary-700 flex items-center gap-1 text-sm font-medium"
            >
              → Track Order
            </a>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Map Section -->
    <div class="mt-16">
      <h2 class="mb-6 text-center text-3xl font-bold">Find Us Here</h2>
      <UCard>
        <div class="relative flex aspect-21/9 items-center justify-center bg-gray-100">
          <div class="text-center">
            <UIcon name="i-heroicons-map-pin" class="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <p class="text-lg font-medium text-gray-500">Map View</p>
            <p class="text-sm text-gray-400">123 Fashion Street, New York, NY 10001</p>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';

.header-icon-container {
  @apply flex h-12 w-12 items-center justify-center rounded-full;
}

.header-icon {
  @apply h-6 w-6;
}

.social-icon-container {
  @apply flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30;
}

.social-icon {
  @apply h-5 w-5;
}
</style>
