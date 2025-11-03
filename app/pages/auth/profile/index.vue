<template>
  <div>
    <UForm state="inputs" class="grid w-full grid-cols-2 gap-6">
      <UFormField name="name" label="Name" :required="editProfile">
        <UInput v-model="inputs.name" :disabled="!editProfile" />
      </UFormField>

      <UFormField name="email" label="Email" :required="editProfile">
        <UInput v-model="inputs.email" :disabled="!editProfile" />
      </UFormField>

      <UFormField name="phone" label="Phone" :required="editProfile">
        <UInput v-model="inputs.phone" :disabled="!editProfile" />
      </UFormField>

      <UFormField name="address" label="Address" :required="editProfile">
        <UInput v-model="inputs.address" :disabled="!editProfile" />
      </UFormField>
    </UForm>

    <div class="mt-4 flex gap-2">
      <UButton v-if="!editProfile" label="Edit Profile" @click="editProfile = true" />
      <template v-else>
        <UButton label="Cancel" variant="outline" @click="editProfile = false" />
        <UButton label="Save" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
  pageHeading: 'My Profile',
})

const editProfile = ref(false)

const inputs = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
})
</script>
