<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import Login from '~/components/auth/login.vue'
import UserMenu from '~/layouts/components/UserMenu.vue'

const route = useRoute()
const authStore = useAuthStore()
const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Women's Clothing",
    to: '/',
    active: route.path.startsWith("/women's clothing"),
  },
  {
    label: "Men's Clothing",
    to: '/',
    active: route.path.startsWith("/men's clothing"),
  },
  {
    label: 'Shirts',
    to: '/',
    active: route.path.startsWith('/shirts'),
  },
])
</script>

<template>
  <UHeader
    toggle
    mode="drawer"
    :ui="{
      container: 'max-w-[1440px]',
    }"
  >
    <template #title>
      <UIcon name="i-lucide-shopping-cart" class="h-6 w-6" />
    </template>

    <UNavigationMenu :items="items" highlight viewTransition />

    <template v-if="!authStore.isAuthenticated" #right>
      <Login />
      <UButton variant="outline" label="Sign Up" size="md" />
    </template>
    <template v-else #right>
      <UserMenu />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" highlight />
    </template>
  </UHeader>
</template>
