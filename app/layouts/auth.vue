<template>
  <div>
    <template v-if="isAuthenticated">
      <UiNavbar />
      <main class="mx-auto h-full max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8">
        <div class="mt-4 flex gap-4">
          <div
            class="sticky top-24 flex max-h-[50dvh] min-h-[50dvh] max-w-[250px] min-w-[250px] flex-col gap-2 rounded-lg bg-gray-100 p-4 max-lg:hidden"
          >
            <h2 class="mb-4 text-lg font-bold">Hello, User</h2>

            <ULink
              v-for="link in links"
              :to="link.to"
              :key="link.to"
              class="rounded-lg p-2"
              active-class="bg-primary text-white"
            >
              {{ link.label }}
            </ULink>
          </div>
          <div class="flex w-full flex-col gap-4">
            <slot name="heading">
              <h1 class="text-2xl font-bold text-black">{{ pageHeading }}</h1>
            </slot>
            <slot />
          </div>
        </div>
      </main>
    </template>
    <template v-else>
      <div
        class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div class="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow">
          <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">Please Log In</h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            You must be logged in to access this page.
          </p>
          <div class="mt-6 flex justify-center">
            <UButton color="primary" @click="openLoginModal = true"> Log In</UButton>
            <UButton variant="outline" class="ml-4" to="/" viewTransition> Go to Home </UButton>
          </div>
        </div>
      </div>
    </template>
    <Login v-model:open="openLoginModal" />
  </div>
</template>

<script setup lang="ts">
import Login from '~/components/auth/login.vue'

const links = ref([
  {
    label: 'My Profile',
    to: '/auth/profile',
  },
  {
    label: 'My Orders',
    to: '/auth/orders',
  },
  {
    label: 'My Wishlist',
    to: '/auth/wishlist',
  },
])

const route = useRoute()
const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)
const pageHeading = computed(() => route.meta.pageHeading || 'My Profile')
const openLoginModal = ref(false)
</script>
