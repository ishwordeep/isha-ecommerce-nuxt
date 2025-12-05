<template>
  <div class="relative flex min-h-screen w-full flex-col">
    <!-- Wait for client-side auth initialization to avoid flashing unauthenticated UI -->
    <div v-if="!isHydrated" class="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div
        class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-r-transparent"
      ></div>
    </div>

    <template v-else-if="isAuthenticated">
      <UiNavbar />
      <main class="mx-auto h-full w-full max-w-[1440px] flex-1 px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex w-full flex-col gap-4">
          <slot name="heading">
            <h1 class="text-2xl font-bold text-black">{{ pageHeading }}</h1>
          </slot>
          <slot />
        </div>
      </main>
      <UiFooter />
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
            <UButton variant="outline" class="ml-4" to="/" viewTransition> Go to Home</UButton>
          </div>
        </div>
      </div>
    </template>
    <Login :showTrigger="false" v-model:open="openLoginModal" />
  </div>
</template>

<script setup lang="ts">
import Login from '~/components/auth/login.vue'

const route = useRoute()
const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)
// Use global hydration flag managed in app.vue
const isHydrated = useState<boolean>('isHydrated')
const pageHeading = computed(() => route.meta.pageHeading || 'My Profile')
const openLoginModal = ref(false)
</script>
