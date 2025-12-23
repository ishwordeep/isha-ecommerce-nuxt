<script setup lang="ts">
const props = defineProps<{
  url?: string
}>()

const copied = ref(false)

// Get the current URL only on the client side
const shareUrl = ref('')

onMounted(() => {
  if (!props.url && process.client) {
    shareUrl.value = window.location.href
  } else if (props.url) {
    shareUrl.value = props.url
  }
})

const handleCopyLink = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const shareOptions = [
  {
    name: 'Email',
    icon: 'i-lucide-mail',
    color: 'gray',
    action: () =>
      window.open(`mailto:?subject=Check%20this%20out&body=${encodeURIComponent(shareUrl.value)}`),
  },
  {
    name: 'WhatsApp',
    icon: 'i-lucide-message-circle',
    color: 'green',
    action: () => window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl.value)}`),
  },
  {
    name: 'Facebook',
    icon: 'i-lucide-facebook',
    color: 'blue',
    action: () =>
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}`
      ),
  },
  {
    name: 'Twitter',
    icon: 'i-lucide-twitter',
    color: 'blue',
    action: () =>
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl.value)}&text=Check%20this%20out`
      ),
  },
]
</script>

<template>
  <!-- Modal -->
  <UModal title="Share" description="Share this product with others">
    <UButton icon="i-lucide-share-2" variant="outline" />

    <template #body>
      <!-- Share Buttons Grid -->
      <div class="mb-8 grid grid-cols-5 gap-4">
        <button
          v-for="option in shareOptions"
          :key="option.name"
          @click="option.action"
          class="flex flex-col items-center gap-2 rounded-xl p-4 transition-all hover:scale-105"
          :class="`bg-${option.color}-100 hover:bg-${option.color}-200 text-${option.color}-700 dark:bg-${option.color}-900/30 dark:hover:bg-${option.color}-900/50 dark:text-${option.color}-400`"
        >
          <UIcon :name="option.icon" class="h-8 w-8" />
          <span class="text-xs font-medium">{{ option.name }}</span>
        </button>
      </div>

      <!-- Copy Link Section -->
      <div class="space-y-3">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Or copy link</label>
        <div class="flex gap-3">
          <UInput
            :model-value="shareUrl"
            readonly
            size="lg"
            color="neutral"
            variant="outline"
            class="flex-1 truncate font-mono text-sm"
          />
          <UButton @click="handleCopyLink" color="secondary" size="lg">
            <UIcon :name="copied ? 'i-lucide-check' : 'i-lucide-copy'" class="h-4 w-4" />
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
