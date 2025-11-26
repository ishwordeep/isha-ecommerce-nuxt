<template>
  <div class="flex flex-col gap-8">
    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:gap-6">
      <div class="account-card flex flex-col bg-gradient-to-br from-blue-500 to-blue-600">
        <UIcon name="i-lucide-package" class="account-card-icon" />
        <span class="account-card-header">12</span>
        <span class="text-blue-100">Total Orders</span>
      </div>
      <div class="account-card flex flex-col bg-gradient-to-br from-pink-500 to-pink-600">
        <div class="flex flex-col">
          <UIcon name="i-lucide-heart" class="account-card-icon" />
          <span class="account-card-header">12</span>
          <span class="text-pink-100">Wishlist Items</span>
        </div>
      </div>
    </div>

    <AuthProfile />

    <RecentOrders />
  </div>
</template>

<script lang="ts" setup>
import AuthProfile from './components/Profile.vue'
import RecentOrders from './components/RecentOrders.vue'
</script>

<style scoped>
@reference "tailwindcss";
.account-card {
  @apply cursor-pointer rounded-xl p-6 text-white transition-shadow hover:shadow-lg;
}

.account-card-icon {
  @apply mb-3 h-8 w-8 opacity-90;
}

.account-card-header {
  @apply mb-1 text-3xl font-bold;
}
</style>
