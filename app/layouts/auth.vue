<template>
  <div>
    <UiNavbar />
    <main class="mx-auto h-full max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8">
      <div class="mt-4 flex gap-4">
        <div
          class="bg-primary/10 sticky top-24 flex max-h-[50dvh] min-h-[50dvh] max-w-[250px] min-w-[250px] flex-col gap-2 p-4"
        >
          <h2 class="mb-4 text-lg font-bold">Hello, User</h2>

          <ULink
            v-for="link in links"
            :to="link.to"
            :key="link.to"
            class="rounded-lg p-2"
            active-class="bg-secondary text-white"
          >
            {{ link.label }}
          </ULink>
        </div>
        <div class="flex w-full flex-col gap-4">
          <slot name="heading">
            <h1 class="text-2xl font-bold text-black">{{ pageHeading }}</h1>
          </slot>
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const links = ref([
  {
    label: 'My Profile',
    to: '/auth/profile',
  },
  {
    label: 'My Orders',
    to: '/auth/orders',
  },
  {
    label: 'My Wishlist',
    to: '/auth/wishlist',
  },
])

const route = useRoute()
const pageHeading = computed(() => route.meta.pageHeading || 'My Profile')
</script>
