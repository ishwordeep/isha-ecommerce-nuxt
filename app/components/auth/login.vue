<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const props = withDefaults(
  defineProps<{
    showTrigger?: boolean
    open?: boolean
  }>(),
  {
    showTrigger: true,
    open: false,
  }
)

const emit = defineEmits(['update:open'])

const open = computed({
  get: () => props.open,
  set: (v: boolean) => emit('update:open', v),
})

const showPassword = ref(false)
const auth = useAuth()
const toast = useToast()
defineShortcuts({
  o: () => (open.value = !open.value),
})

const inputs = reactive({
  email: '',
  password: '',
})

const onSubmit = async () => {
  const response = await auth.login({
    email: inputs.email,
    password: inputs.password,
  })
  if (response.success) {
    // close modal by emitting update
    open.value = false
  } else {
    toast.add({
      color: 'error',
      title: 'Login Failed',
      description: response.error?.message ?? 'An error occurred during login.',
      duration: 5000,
    })
  }
}
// props are defined above via withDefaults
</script>

<template>
  <UModal title="Login" v-model:open="open" :dismissible="false">
    <UButton v-if="showTrigger" label="Sign In" size="md" />
    <template #body>
      <UForm state="inputs" @submit="onSubmit" class="flex flex-col gap-4">
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
        <div class="flex justify-end">
          <span class="cursor-pointer hover:underline"> Forgot Password? </span>
        </div>
        <UButton type="submit" label="Login" class="justify-center" />
      </UForm>
    </template>
  </UModal>
</template>
