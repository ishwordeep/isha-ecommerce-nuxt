<script setup lang="ts">
const data = ref([
  {
    heading: 'Our Mission',
    description:
      'To empower individuals to express their unique style through carefully curated fashion that combines quality, affordability, and sustainability.',
    gradient: 'from-blue-500 to-blue-600',
    icon: 'i-lucide-target',
  },
  {
    heading: 'Our Vision',
    description:
      "To become the world's most trusted and loved fashion destination, setting new standards for customer experience and sustainable retail.",
    gradient: 'from-purple-500 to-purple-600',
    icon: 'i-heroicons-sparkles',
  },
])
</script>

<template>
  <div class="my-6 grid grid-cols-1 gap-2 sm:my-10 sm:gap-6 md:grid-cols-2 lg:my-20 lg:gap-12">
    <UCard class="transition-shadow hover:shadow-lg" v-for="(item, idx) in data" :key="idx">
      <template #header>
        <div
          class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg"
          :class="[item.gradient]"
        >
          <UIcon :name="item.icon" class="h-8 w-8 text-white" />
        </div>
      </template>
      <h2 class="mb-4 text-3xl font-bold text-gray-900">{{ item.heading }}</h2>
      <p class="mb-4 text-lg text-gray-700">
        {{ item.description }}
      </p>
    </UCard>
  </div>
</template>
