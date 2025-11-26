<template>
  <UModal
    :title="`${props.mode === 'add' ? 'Add New' : 'Edit'} Address`"
    v-model:open="modalOpen"
    @update:open="
      (val) => {
        if (!val) authStore.resetAddressForm()
      }
    "
    :dismissible="false"
  >
    <template #trigger>
      <slot name="trigger"></slot>
    </template>

    <template #body>
      <UForm
        :schema="schema"
        :state="authStore.addressFormInputs"
        class="flex flex-col gap-4"
        id="address-form"
        @submit="onSubmit"
      >
        <UFormField label="Country" name="country" required>
          <UInput v-model="authStore.addressFormInputs.country" />
        </UFormField>

        <UFormField label="City" name="city" required>
          <UInput v-model="authStore.addressFormInputs.city" />
        </UFormField>

        <UFormField label="State" name="state" required>
          <UInput v-model="authStore.addressFormInputs.state" />
        </UFormField>

        <UFormField label="Street" name="street">
          <UInput v-model="authStore.addressFormInputs.street" />
        </UFormField>

        <UFormField label="Apartment" name="apartment">
          <UInput v-model="authStore.addressFormInputs.apartment" />
        </UFormField>

        <UFormField label="Zip Code" name="zipCode" required>
          <UInput v-model="authStore.addressFormInputs.zipCode" />
        </UFormField>

        <UCheckbox
          v-model="authStore.addressFormInputs.isDefault"
          label="Set as default address"
          class="w-max"
        />
      </UForm>
    </template>

    <template #footer="{ close }">
      <div class="flex w-full justify-end gap-2">
        <UButton :disabled="isSubmitting" label="Cancel" variant="outline" @click="close" />
        <UButton
          :loading="isSubmitting"
          label="Submit"
          type="submit"
          form="address-form"
          :disabled="isSubmitting"
        />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import * as z from 'zod'
const props = withDefaults(
  defineProps<{
    mode?: 'add' | 'edit'
    open?: boolean
  }>(),
  {
    mode: 'add',
    open: false,
  }
)

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const modalOpen = computed({
  get: () => props.open,
  set: (val: boolean) => emit('update:open', val),
})

const authStore = useAuthStore()
const auth = useAuth()
const toast = useToast()
const isSubmitting = ref(false)

const schema = z.object({
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip Code is required'),
  country: z.string().min(1, 'Country is required'),
  street: z.string().optional(),
  apartment: z.string().optional(),
  isDefault: z.boolean().optional(),
})

watch(
  () => props.open,
  async (nowOpen) => {
    if (!nowOpen) return

    if (props.mode === 'add') {
      authStore.initializeAddressForAdd()
      return
    }

    // ----- edit mode -----
    if (!authStore.selectedAddress) {
      toast.add({
        color: 'error',
        title: 'Missing address',
        description: 'Address is required for edit mode.',
      })
      emit('update:open', false)
      return
    } else {
      authStore.initializeAddressForEdit(authStore.selectedAddress)
    }
  },
  { immediate: true } // run on first render if already open
)

const onSubmit = async () => {
  isSubmitting.value = true
  const isAdd = props.mode === 'add'
  const action = () => auth.addShippingAddress(authStore.addressFormInputs)
  //   const action = isAdd
  //     ? () => auth.addShippingAddress(authStore.addressFormInputs)
  //     :
  //     () => auth.updateShippingAddress(authStore.selectedAddress?._id!, authStore.addressFormInputs)

  const response = await action()

  if (response?.data?.success) {
    toast.add({
      color: 'success',
      title: 'Success',
      description: `Address ${isAdd ? 'added' : 'updated'} successfully`,
    })
    emit('update:open', false)
    authStore.resetAddressForm()
  } else {
    toast.add({
      color: 'error',
      title: 'Error',
      description: `Failed to ${isAdd ? 'add' : 'update'} address`,
    })
  }
  isSubmitting.value = false
}
</script>
