<template>
  <div class="rounded-xl border border-gray-200 bg-white p-6">
    <div class="mb-4 flex items-center justify-between">
      <h3 class="text-lg font-bold text-gray-900">Profile Information</h3>

      <!--Form-->
      <UModal title="Edit Profile" v-model:open="openModal">
        <div
          class="text-primary hover:text-primary/80 flex cursor-pointer items-center gap-1 text-sm font-medium"
        >
          <UIcon name="i-lucide-pencil" class="h-4 w-4" />
          Edit
        </div>

        <template #body>
          <UForm state="inputs" class="flex flex-col gap-4" id="profile-form" @submit="onSubmit">
            <UFormField name="name" label="Name" required>
              <UInput v-model="inputs.name" />
            </UFormField>

            <UFormField name="email" label="Email" required>
              <UInput v-model="inputs.email" />
            </UFormField>

            <UFormField name="phone" label="Phone" required>
              <UInput v-model="inputs.phone" />
            </UFormField>

            <UFormField name="address" label="Address" required>
              <UInput v-model="inputs.address" />
            </UFormField>
          </UForm>
        </template>

        <template #footer>
          <div class="flex w-full justify-end gap-2">
            <UButton label="Cancel" variant="outline" @click="handleClose" />
            <UButton type="submit" label="Save" form="profile-form" />
          </div>
        </template>
      </UModal>
      <!--Form-->
    </div>
    <div class="space-y-3">
      <div class="flex items-center gap-3">
        <div class="profile-image text-4xl">{{ userProfile.avatar }}</div>
        <div>
          <div class="font-semibold text-gray-900">{{ userProfile.name }}</div>
          <div class="text-sm text-gray-500">Customer since Nov 2025</div>
        </div>
      </div>
      <div class="border-t-default space-y-2 border-t pt-3">
        <div class="flex justify-between text-sm">
          <span class="text-gray-600">Email</span>
          <span class="font-medium text-gray-900">{{ userProfile.email }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-600">Phone</span>
          <span class="font-medium text-gray-900">{{ userProfile.phone }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const openModal = ref(false)

const userProfile = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 234 567 8900',
  avatar: '👤',
  address: '123 Main St, Anytown, USA',
})

const inputs = reactive({
  name: userProfile.value?.name || '',
  email: userProfile.value?.email || '',
  phone: userProfile.value?.phone || '',
  address: userProfile.value?.address || '',
})

const reset = () => {
  inputs.name = userProfile.value.name
  inputs.email = userProfile.value.email
  inputs.phone = userProfile.value.phone
}

const handleClose = () => {
  openModal.value = false
  reset()
}

const onSubmit = async () => {
  console.log(inputs)
  openModal.value = false
}
</script>
