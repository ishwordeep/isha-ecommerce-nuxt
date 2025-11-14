<template>
  <div class="flex flex-col gap-4">
    <UButton
      label="Add New Address"
      size="md"
      leadingIcon="i-lucide-plus"
      class="w-max"
      @click="openForm = true"
    />

    <template v-if="authStore.isFetchingProfile">
      <AddressSkeletonCard v-for="n in 3" :key="n" />
    </template>

    <AddressCard
      v-else
      v-for="address in authStore.user?.shippingAddresses"
      :key="address._id"
      :address="address"
    />

    <AddressForm mode="add" v-model:open="openForm" />
  </div>
</template>
<script setup lang="ts">
import AddressCard from './components/AddressCard.vue'
import AddressForm from './components/AddressForm.vue'
import AddressSkeletonCard from './components/AddressSkeletonCard.vue'
const authStore = useAuthStore()
const openForm = ref(false)
definePageMeta({
  layout: 'auth',
  pageHeading: 'My Addresses',
})
</script>
