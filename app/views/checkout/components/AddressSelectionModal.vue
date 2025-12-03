<template>
  <UModal
    v-model:open="isOpen"
    size="lg"
    title="Select Shipping Address"
    :ui="{
      content: 'max-w-2xl',
    }"
  >
    <template #body>
      <div class="space-y-4">
        <!-- Add New Address Button -->
        <UButton
          label="Add New Address"
          leadingIcon="i-lucide-plus"
          class="w-full justify-center"
          variant="outline"
          @click="handleAddNewAddress"
          color="secondary"
        />

        <!-- Address List -->
        <div v-if="authStore.isFetchingProfile" class="grid grid-cols-1 gap-3">
          <AddressSkeletonCard v-for="n in 3" :key="n" />
        </div>

        <div v-else-if="authStore.user?.shippingAddresses?.length" class="grid grid-cols-1 gap-3">
          <div
            v-for="address in authStore.user.shippingAddresses"
            :key="address._id"
            class="hover:border-secondary relative cursor-pointer rounded-lg border-2 p-4 transition-all"
            :class="[
              selectedAddressId === address._id
                ? 'border-secondary bg-secondary/10'
                : 'border-gray-200',
            ]"
            @click="selectAddress(address)"
          >
            <!-- Selection Radio/Checkmark -->
            <div class="absolute top-3 right-3">
              <div
                class="flex h-5 w-5 items-center justify-center rounded-full border-2"
                :class="[
                  selectedAddressId === address._id
                    ? 'border-secondary bg-secondary'
                    : 'border-gray-300',
                ]"
              >
                <UIcon
                  v-if="selectedAddressId === address._id"
                  name="i-lucide-check"
                  class="h-3 w-3 text-white"
                />
              </div>
            </div>

            <!-- Address Details -->
            <div class="space-y-1 pr-8 text-sm text-gray-600 dark:text-gray-400">
              <h3 class="text-base leading-6 font-semibold text-gray-900 dark:text-white">
                {{ address.street || 'Home' }}
              </h3>
              <p>
                {{ address.apartment ? address.apartment + ', ' : '' }}{{ address.city }},
                {{ address.state }}
              </p>
              <p>{{ address.zipCode }}</p>
              <p>{{ address.country }}</p>
              <UBadge v-if="address.isDefault" color="info" variant="soft" class="mt-2">
                Default
              </UBadge>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="py-8 text-center">
          <UIcon name="i-lucide-map-pin-off" class="mx-auto h-12 w-12 text-gray-400" />
          <p class="mt-2 text-sm text-gray-500">
            No addresses found. Add a new address to continue.
          </p>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex w-full justify-end space-x-2">
        <UButton @click="isOpen = false" variant="outline">Cancel</UButton>
        <UButton color="primary" @click="confirmSelection" :disabled="!selectedAddressId">
          Confirm Selection
        </UButton>
      </div>
    </template>
  </UModal>

  <!-- Add Address Form Modal -->
  <AddressForm mode="add" v-model:open="showAddForm" @saved="handleAddressSaved" />
</template>

<script setup lang="ts">
import type { Address } from '~/services/auth.service'
import AddressForm from '~/views/auth/addresses/components/AddressForm.vue'
import AddressSkeletonCard from '~/views/auth/addresses/components/AddressSkeletonCard.vue'

const authStore = useAuthStore()

const isOpen = defineModel<boolean>('open', { default: false })

const emit = defineEmits<{
  select: [address: Address]
}>()

const selectedAddressId = ref<string | null>(null)
const showAddForm = ref(false)

// Set default address as selected when modal opens
watch(isOpen, (newVal) => {
  if (newVal && authStore.user?.shippingAddresses) {
    const defaultAddress = authStore.user.shippingAddresses.find((addr) => addr.isDefault)
    if (selectedAddressId.value) return // Don't override if already selected
    if (defaultAddress) {
      selectedAddressId.value = defaultAddress._id
    } else if (authStore.user.shippingAddresses.length > 0) {
      selectedAddressId.value = authStore.user?.shippingAddresses?.[0]?._id || null
    }
  }
})

const selectAddress = (address: Address) => {
  console.log(address)
  selectedAddressId.value = address._id
}

const confirmSelection = () => {
  const selectedAddress = authStore.user?.shippingAddresses?.find(
    (addr) => addr._id === selectedAddressId.value
  )
  if (selectedAddress) {
    emit('select', selectedAddress)
    isOpen.value = false
  }
}

const handleAddNewAddress = () => {
  showAddForm.value = true
}

const handleAddressSaved = () => {
  // After saving new address, you might want to auto-select it
  // This depends on your AddressForm implementation
  showAddForm.value = false
}
</script>
