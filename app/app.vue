<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <!-- Loading Screen -->
      <div
        v-show="isInitializing || !isHydrated"
        class="fixed inset-0 z-50 flex items-center justify-center bg-white"
      >
        <div
          class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-r-transparent"
        ></div>
      </div>

      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
<script setup lang="ts">
const isInitializing = ref(true)
const authStore = useAuthStore()
// Global hydration flag for app-wide usage
const isHydrated = useState<boolean>('isHydrated', () => false)

onMounted(async () => {
  // initialize auth from localStorage on client to avoid UI flash
  // if (!settingStore.setting && authStore.isAuthenticated) {
  //   await settingStore.fetchSetting()
  // }
  // Small delay to prevent flash
  await new Promise((resolve) => setTimeout(resolve, 100))
  await authStore.initAuth()
  if (!authStore.user && authStore.isAuthenticated) {
    await useAuth().fetchCurrentUser()
  }

  // Mark app as hydrated globally once auth init completes
  isHydrated.value = true
  isInitializing.value = false
})

// watch(
//   () => authStore.isAuthenticated,
//   async () => {
//     if (!settingStore.setting && authStore.isAuthenticated) {
//       await settingStore.fetchSetting()
//     }
//   }
// )
</script>
