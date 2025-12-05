<!-- components/AddressCard.vue -->
<script setup lang="ts">
import type { Address } from '~/services/auth.service'
import AddressForm from './AddressForm.vue'

defineProps<{
  address: Address
}>()

const emit = defineEmits<{
  edit: [address: Address]
  delete: [id: string]
}>()

const openForm = ref(false)
const openDeleteModal = ref(false)
const isDeleting = ref(false)
const authStore = useAuthStore()
const { deleteShippingAddress } = useAuth()
const handleOpenForm = (address: Address) => {
  authStore.selectedAddress = address
  openForm.value = true
}

const handleOpenDeleteModal = (address: Address) => {
  authStore.selectedAddress = address
  openDeleteModal.value = true
}

const onDelete = async () => {
  if (!authStore.selectedAddress) return
  isDeleting.value = true
  try {
    await deleteShippingAddress(authStore.selectedAddress._id)
    console.log('Deleting Address', authStore.selectedAddress)
    openDeleteModal.value = false
  } catch (error) {
    console.error('Error deleting address:', error)
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <div>
    <UCard>
      <div class="relative space-y-1 text-sm text-gray-600 dark:text-gray-400">
        <h3 class="text-base leading-6 font-semibold text-gray-900 dark:text-white">
          {{ address.street || 'Home' }}
        </h3>
        <p>
          {{ address.apartment ? address.apartment + ',' : '' }} {{ address.city }},
          {{ address.state }}
        </p>
        <p>{{ address.zipCode }}</p>
        <p>{{ address.country }}</p>
        <!-- <p>Phone: {{ address.phone }}</p> -->
        <UBadge v-if="address.isDefault" color="info" variant="soft" class="absolute top-2 right-2">
          Default
        </UBadge>
      </div>

      <template #footer>
        <div class="flex gap-2">
          <UButton
            class="w-full items-center"
            size="md"
            variant="outline"
            @click="handleOpenForm(address)"
            leading-icon="i-lucide-pencil"
            :ui="{
              base: 'items-center justify-center',
              leadingIcon: 'mr-0 w-4 h-4',
            }"
            color="info"
          >
            Edit
          </UButton>
          <UButton
            class="w-full"
            size="md"
            color="error"
            variant="outline"
            @click="handleOpenDeleteModal(address)"
            leading-icon="i-lucide-trash-2"
            :ui="{
              base: 'items-center justify-center',
              leadingIcon: 'mr-0 w-4 h-4',
            }"
          >
            Delete
          </UButton>
        </div>
      </template>
    </UCard>
    <AddressForm mode="edit" v-model:open="openForm" />

    <UModal v-model:open="openDeleteModal" size="md" title="Delete Address">
      <template #body>
        Are you sure you want to delete this address? This action cannot be undone.
      </template>
      <template #footer>
        <div class="flex w-full justify-end space-x-2">
          <UButton
            @click="
              () => {
                authStore.selectedAddress = null
                openDeleteModal = false
              }
            "
            variant="outline"
            :disabled="isDeleting"
            >Cancel</UButton
          >
          <UButton color="error" @click="onDelete" :loading="isDeleting">Delete</UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>
