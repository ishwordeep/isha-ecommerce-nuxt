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
      label: 'My Orders',
      to: '/auth/orders',
    },

    {
      label: 'My Wishlists',
      to: '/auth/wishlist',
    },
  ],
  [
    {
      label: 'Sign Out',
      color: 'error',
      action: async () => {
        await auth.logout()
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
      side: 'bottom-end' as any,
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
