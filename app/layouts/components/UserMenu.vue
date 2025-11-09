<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

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
    <UButton
      color="neutral"
      square
      class="rounded-full"
      variant="subtle"
      icon="i-lucide-user"
      viewTransition
    />
  </UDropdownMenu>
</template>
