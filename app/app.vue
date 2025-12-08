<template>
  <UApp :toaster="toaster">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <!-- Loading Screen -->
      <div
        v-show="isInitializing || !isHydrated"
        class="fixed inset-0 z-50 flex items-center justify-center bg-white"
      >
        <div
          class="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-r-transparent"
        ></div>
      </div>

      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
<script setup lang="ts">
const isInitializing = ref(true)
const authStore = useAuthStore()
const settingStore = useSettingStore()
// Global hydration flag for app-wide usage
const isHydrated = useState<boolean>('isHydrated', () => false)
const toaster = { position: 'bottom-center', max: 3 } as const
onMounted(async () => {
  await Promise.all([settingStore.fetchSetting(), authStore.initAuth()])
  if (!authStore.user && authStore.isAuthenticated) {
    await useAuth().fetchCurrentUser()
  }

  isHydrated.value = true
  isInitializing.value = false
})
</script>
