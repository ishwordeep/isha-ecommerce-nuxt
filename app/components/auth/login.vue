<script setup lang="ts">
const open = ref(false)
const showPassword = ref(false)
defineShortcuts({
  o: () => (open.value = !open.value),
})

const inputs = reactive({
  email: '',
  password: '',
})

const onSubmit = async () => {
  console.log(inputs)
  open.value = false
}
</script>

<template>
  <UModal title="Login" v-model:open="open" :dismissible="false">
    <UButton label="Sign In" size="md" />
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
