<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import Login from '~/components/auth/login.vue'
import SignUp from '~/components/auth/signup.vue'
import UserMenu from '~/layouts/components/UserMenu.vue'
import UserCart from '~/layouts/components/UserCart.vue'

const route = useRoute()
const authStore = useAuthStore()
const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'New',
    to: '/products/collection/new',
    active: route.path === '/products/collection/new',
  },
  {
    label: 'Categories',
    to: '/categories',
    active: route.path.startsWith('/categories'),
  },
  {
    label: 'Featured',
    to: '/products/collection/featured',
    active: route.path.startsWith('/products/collection/featured'),
  },
  {
    label: 'Sales',
    to: '/sales',
    active: route.path.startsWith('/sales'),
  },
  {
    label: 'About Us',
    to: '/about',
    active: route.path === '/about',
  },
])
</script>

<template>
  <UHeader
    mode="drawer"
    :ui="{
      container: 'max-w-[1440px]',
    }"
    :toggle="{
      color: 'primary',
      variant: 'ghost',
    }"
  >
    <template #title>
      <UIcon name="i-lucide-shopping-cart" class="h-6 w-6" />
    </template>

    <UNavigationMenu :items="items" highlight viewTransition />

    <template v-if="!authStore.isAuthenticated" #right>
      <Login />
      <SignUp />
    </template>
    <template v-else #right>
      <UserCart />
      <UserMenu />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
