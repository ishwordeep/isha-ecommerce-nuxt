<template>
  <div class="flex flex-col gap-4">
    <UButton
      label="Add New Address"
      size="md"
      leadingIcon="i-lucide-plus"
      class="w-max"
      @click="openForm = true"
      v-if="authStore.user?.shippingAddresses.length"
    />

    <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
      <template v-if="authStore.isFetchingProfile">
        <AddressSkeletonCard v-for="n in 4" :key="n" />
      </template>
      <AddressCard
        v-else-if="authStore.user?.shippingAddresses.length"
        v-for="address in authStore.user?.shippingAddresses"
        :key="address._id"
        :address="address"
      />
      <div v-else class="col-span-full py-16 text-center">
        <div class="mx-auto max-w-md">
          <!-- Icon -->
          <div
            class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100"
          >
            <UIcon name="i-lucide-map-pin-off" class="h-12 w-12 text-gray-400" />
          </div>

          <!-- Message -->
          <h3 class="mb-3 text-xl font-semibold text-gray-900">No saved addresses yet</h3>
          <p class="mb-8 text-gray-600">
            Add your first address to make checkout faster and easier.
          </p>

          <!-- Call to Action -->
          <UButton
            label="Add Your First Address"
            size="lg"
            leading-icon="i-lucide-plus"
            color="primary"
            class="font-medium"
            @click="openForm = true"
          />
        </div>
      </div>
    </div>
    <AddressForm mode="add" v-model:open="openForm" />
  </div>
</template>
<script setup lang="ts">
import AddressCard from './components/AddressCard.vue'
import AddressForm from './components/AddressForm.vue'
import AddressSkeletonCard from './components/AddressSkeletonCard.vue'
const authStore = useAuthStore()
const openForm = ref(false)
</script>
