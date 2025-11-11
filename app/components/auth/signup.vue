<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { z } from 'zod'
const open = ref(false)
const showPassword = ref(false)
const auth = useAuth()
const toast = useToast()
defineShortcuts({
  o: () => (open.value = !open.value),
})

const userSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(100, { message: 'Name must be 100 characters or less' }),

  email: z.string().email({ message: 'Enter a valid email address' }),

  // Minimum length + at least one lowercase, uppercase, number and special char
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(128, { message: 'Password is too long' }),

  // Allow empty string (not provided) or E.164-ish format (e.g. +9779812345678)
  phone: z
    .string()
    .optional()
    .refine((v) => !v || /^\+?[1-9]\d{1,14}$/.test(v), {
      message: 'Phone must be in international E.164 format (eg +9779812345678)',
    }),
})

const inputs = reactive({
  name: '',
  email: '',
  password: '',
  phone: '',
})

const onSubmit = async () => {
  const response = await auth.register({
    name: inputs.name,
    email: inputs.email,
    password: inputs.password,
    phone: inputs.phone,
  })
  console.log(response)
  if (response.success) {
    toast.add({
      color: 'success',
      title: 'Sign Up Successful',
      description: 'You have signed up successfully.',
      duration: 5000,
    })
    open.value = false
  } else {
    toast.add({
      color: 'error',
      title: 'Sign Up Failed',
      description: response.error?.message ?? 'An error occurred during sign up.',
      duration: 5000,
    })
  }
}
</script>

<template>
  <UModal title="Sign Up" v-model:open="open" :dismissible="false">
    <UButton label="Sign Up" variant="outline" size="md" />
    <template #body>
      <UForm :state="inputs" :schema="userSchema" @submit="onSubmit" class="flex flex-col gap-4">
        <UFormField name="name" label="Name" required>
          <UInput name="name" type="name" v-model="inputs.name" />
        </UFormField>
        <UFormField name="email" label="Email" required>
          <UInput name="email" type="email" v-model="inputs.email" />
        </UFormField>
        <UFormField name="password" label="Password" required>
          <UInput
            name="password"
            :type="showPassword ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1' }"
            v-model="inputs.password"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showPassword"
                aria-controls="password"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormField>
        <UFormField name="phone" label="Phone" required>
          <UInput name="phone" type="phone" v-model="inputs.phone" />
        </UFormField>
        <div class="flex justify-end">
          <span class="cursor-pointer hover:underline"> Forgot Password? </span>
        </div>
        <UButton type="submit" label="Login" class="justify-center" />
      </UForm>
    </template>
  </UModal>
</template>
