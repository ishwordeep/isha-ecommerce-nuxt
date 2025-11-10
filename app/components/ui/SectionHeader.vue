<template>
  <div class="flex flex-col items-center gap-2 text-center">
    <div class="mb-3 flex items-center gap-3">
      <!-- Dynamic gradient background -->
      <div
        :class="[
          'w-12',
          'h-12',
          'bg-gradient-to-br',
          collection.gradient,
          'rounded-xl',
          'flex',
          'items-center',
          'justify-center',
          'shadow-lg',
        ]"
      >
        <!-- Dynamic icon with fallback -->
        <UIcon :name="collection.iconName" v-if="collection.iconName" class="h-6 w-6 text-white" />
      </div>
      <h2 class="text-3xl font-bold text-gray-900">
        {{ collection.title }}
      </h2>
    </div>

    <p class="mt-1 max-w-2xl text-gray-600">
      {{ collection.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
// Nuxt 4 + Vue 3 + TypeScript + Composition API
defineProps<{
  collection: {
    title: string
    description: string
    gradient: string
    iconName?: string
  }
}>()
</script>
