<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { useAuth } from '~/composables/useAuth'

const auth = useAuth()
const authStore = useAuthStore()
const items: DropdownMenuItem[][] = [
  [
    {
      label: 'My Profile',
      to: '/auth/profile',
    },
    {
      label: 'My Addresses',
      to: '/auth/addresses',
    },
    {
      label: 'My Orders',
      to: '/auth/orders',
    },
    // {
    //   label: 'My Wishlist',
    //   to: '/auth/wishlist',
    // },
  ],
  [
    {
      label: 'Sign Out',
      color: 'error',
      onSelect: async () => {
        await auth.logout()
        navigateTo('/')
      },
    },
  ],
]
</script>

<template>
  <UDropdownMenu
    :items="items"
    :ui="{ content: 'w-36' }"
    :modal="false"
    :content="{
      side: 'bottom',
      align: 'end',
    }"
  >
    <UButton v-if="authStore.user?.image">
      {{ authStore.user?.image }}
    </UButton>
    <UButton
      v-else
      color="neutral"
      square
      class="rounded-full"
      variant="subtle"
      icon="i-lucide-user"
      viewTransition
    />
  </UDropdownMenu>
</template>
