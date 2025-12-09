<template>
  <div class="relative overflow-hidden bg-[#F6F3E8] px-6 py-16">
    <div class="mx-auto max-w-3xl text-center">
      <h1 class="mb-4 text-xl font-bold text-gray-900 sm:text-3xl md:text-6xl">
        {{ section.title }}
      </h1>
      <p class="text-md text-gray-600 sm:text-xl">
        {{ section.description }}
      </p>
    </div>

    <!-- Decorative Blobs -->
    <div
      class="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-linear-to-br from-purple-200/40 to-pink-200/40 blur-3xl"
    />
    <div
      class="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-linear-to-tr from-blue-200/40 to-green-200/40 blur-3xl"
    />
  </div>
</template>
<script setup lang="ts">
defineProps<{
  section: {
    title: string
    description: string
  }
}>()
</script>
