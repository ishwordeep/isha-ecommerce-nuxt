<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import Login from '~/components/auth/login.vue'
import SignUp from '~/components/auth/signup.vue'
import UserCart from '~/layouts/components/UserCart.vue'
import UserMenu from '~/layouts/components/UserMenu.vue'

const route = useRoute()
const authStore = useAuthStore()

const openLoginModal = ref(false)

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
    active: route.path === '/',
  },
  {
    label: 'Shop',
    to: '/products',
    active: route.path === '/products',
  },

  {
    label: 'Featured',
    to: '/products/collection/featured',
    active: route.path.startsWith('/products/collection/featured'),
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
      variant: 'ghost',
    }"
  >
    <template #title>
      <UIcon name="i-lucide-shopping-cart" class="h-6 w-6" />
    </template>

    <UNavigationMenu :items="items" highlight viewTransition />

    <template v-if="!authStore.isAuthenticated" #right>
      <Login v-model:open="openLoginModal" />
      <SignUp />
    </template>
    <template v-else #right>
      <UserCart />
      <UserMenu />
    </template>

    <template #body>
      <UNavigationMenu color="neutral" :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
