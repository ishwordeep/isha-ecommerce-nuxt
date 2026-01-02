<script setup lang="ts">
const settingStore = useSettingStore()
const isFetching = ref(false)
// Fetch if needed (optional)
onMounted(async () => {
  if (!settingStore.setting) {
    isFetching.value = true
    await settingStore.fetchSetting()
    isFetching.value = false
  }
})
// The raw HTML from your editor (TipTap, etc.)
const rawHtml = computed(() => settingStore.setting?.sizeGuides || '')

// Fallback when empty
const isEmpty = computed(
  () => !rawHtml.value || rawHtml.value === '<p></p>' || rawHtml.value.trim() === ''
)
</script>

<template>
  <UContainer class="mx-auto max-w-5xl py-12">
    <UPageCard
      title="Size Guides"
      :ui="{
        title: 'text-2xl font-semibold',
      }"
    >
      <!-- Loading / Empty State -->
      <div v-if="isEmpty" class="py-20 text-center">
        <UIcon
          name="i-heroicons-information-circle"
          class="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600"
        />
        <p class="mt-4 text-lg text-gray-500">Size guide is not configured yet.</p>
      </div>

      <!-- Actual Size Guide – rendered safely & beautifully -->
      <div v-else class="raw-html" v-html="rawHtml"></div>

      <!-- Optional nice footer -->
      <p v-if="!isEmpty" class="mt-16 text-center text-sm text-gray-500">
        Last updated:
        {{ new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }}
      </p>
    </UPageCard>
  </UContainer>
</template>
