<template>
  <UApp :toaster="toaster">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <!-- Loading Screen -->
      <UiLoader v-show="isInitializing || !isHydrated" />

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

useAsyncData('initialize-setting', () => settingStore.fetchSetting())
useSettingSeo(computed(() => settingStore.setting))

onMounted(async () => {
  await authStore.initAuth()
  useSettingSeo(computed(() => settingStore.setting))

  if (!authStore.user && authStore.isAuthenticated) {
    await useAuth().fetchCurrentUser()
  }

  isHydrated.value = true
  isInitializing.value = false
})
</script>
