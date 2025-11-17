<template>
  <footer
    class="from-tertiary/20 to-tertiary/80 relative mt-20 w-full overflow-hidden bg-gradient-to-r text-black"
  >
    <div class="mx-auto max-w-[1440px] px-6">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <!-- Brand Column -->
        <div class="lg:col-span-2">
          <h2 class="e mb-4 text-3xl font-bold">Fashion Store</h2>
          <p class="mb-6 leading-relaxed text-gray-700">
            Your destination for premium fashion and timeless style. We curate the finest
            collections to help you express your unique personality.
          </p>
          <div class="flex gap-4">
            <UButton
              to="#"
              icon="i-simple-icons-facebook"
              variant="solid"
              class="icon-button hover:bg-blue-600"
            />
            <UButton
              to="#"
              icon="i-simple-icons-instagram"
              variant="solid"
              class="icon-button hover:bg-pink-600"
            />
            <UButton
              to="#"
              icon="i-simple-icons-twitter"
              variant="solid"
              class="icon-button hover:bg-blue-400"
            />
            <UButton
              to="#"
              icon="i-simple-icons-pinterest"
              variant="solid"
              class="icon-button hover:bg-red-600"
            />
          </div>
        </div>

        <!-- Shop Links -->
        <FooterLinks title="Shop" :links="shopLinks" />

        <!-- Customer Service -->
        <FooterLinks title="Customer Service" :links="customerLinks" />

        <!-- About -->
        <FooterLinks title="About" :links="aboutLinks" />
      </div>

      <!-- Newsletter Signup -->
      <div class="border-t border-gray-800 py-8">
        <div class="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h3 class="mb-2 text-lg font-bold text-black">Stay Updated</h3>
            <p class="text-sm text-gray-700">Subscribe for exclusive offers and updates</p>
          </div>
          <div class="flex flex-col gap-1">
            <form @submit.prevent="subscribe" class="flex w-full gap-2 md:w-auto">
              <UInput
                v-model="email"
                type="email"
                placeholder="Enter your email"
                class="flex-1 md:w-64"
                size="xl"
              />
              <UButton
                type="submit"
                :loading="loading"
                class="rounded-lg font-semibold whitespace-nowrap"
              >
                Subscribe
              </UButton>
            </form>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 py-6">
        <div
          class="flex flex-col items-center justify-between gap-4 text-sm text-gray-700 md:flex-row"
        >
          <div>© {{ new Date().getFullYear() }} Fashion Store. All rights reserved.</div>
          <div class="flex flex-wrap justify-center gap-6">
            <NuxtLink to="#" class="link-text">Privacy Policy</NuxtLink>
            <NuxtLink to="#" class="link-text">Terms of Service</NuxtLink>
            <NuxtLink to="#" class="link-text">Cookie Policy</NuxtLink>
            <NuxtLink to="#" class="link-text">Sitemap</NuxtLink>
          </div>
          <div class="flex items-center gap-3 text-2xl">
            <UIcon name="i-lucide-credit-card" />
            <UIcon name="i-lucide-dollar-sign" />
            <UIcon name="i-lucide-lock" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import FooterLinks from '~/components/ui/FooterLinks.vue'

const email = ref('')
const loading = ref(false)
const toast = useToast()
const subscribe = async () => {
  if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
    toast.add({
      color: 'error',
      title: 'Invalid Email',
      description: 'Please enter a valid email address.',
    })
    return
  }

  loading.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
    toast.add({
      color: 'success',
      title: 'Subscribed',
      description: 'You have successfully subscribed to our newsletter!',
    })
    email.value = ''
  } catch {
    toast.add({
      color: 'error',
      title: 'Subscription Failed',
      description: 'There was an error subscribing to the newsletter. Please try again later.',
    })
  } finally {
    loading.value = false
  }
}

// Footer link groups
const shopLinks = [
  {
    label: 'New Arrivals',
    url: '/products/collection/new',
  },
  { label: 'Best Sellers', url: '/products/collection/trending' },
  { label: 'Featured Picks', url: '/products/collection/trending' },
  { label: 'Gift Cards', url: '#' },
  {
    label: 'Sale',
    url: '#',
  },
]

const customerLinks = [
  { label: 'Contact Us', url: '/contact' },
  { label: 'Shipping Info', url: '#' },
  { label: 'Returns & Exchanges', url: '#' },
  { label: 'Size Guide', url: '#' },
  { label: 'Track Order', url: '#' },
]

const aboutLinks = [
  { label: 'Our Story', url: '#' },
  { label: 'Careers', url: '#' },
  { label: 'Sustainability', url: '#' },
  { label: 'Press', url: '#' },
  { label: 'Blog', url: '#' },
]
</script>

<style scoped>
@reference 'tailwindcss';

.icon-button {
  @apply h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110;
}

.link-text {
  @apply text-gray-700 transition-all duration-200 hover:-translate-y-1 hover:text-black;
}
</style>
