<template>
  <div>
    <h3 class="mb-4 text-lg font-bold text-black">{{ title }}</h3>
    <ul class="space-y-3">
      <li v-for="link in links" :key="link.url">
        <NuxtLink
          :to="link.url"
          class="inline-block text-gray-700 transition-all duration-200 hover:translate-x-1 hover:text-black"
          viewTransition
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  links: {
    label: string
    url: string
  }[]
}>()
</script>
