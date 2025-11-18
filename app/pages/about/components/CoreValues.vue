<script setup lang="ts">
// Core Values
const values = [
  {
    icon: 'i-heroicons-heart',
    title: 'Customer First',
    description:
      'We put our customers at the heart of everything we do, ensuring exceptional service and satisfaction.',
    gradient: 'from-pink-500 to-pink-600',
  },
  {
    icon: 'i-heroicons-trophy',
    title: 'Quality Excellence',
    description:
      'We curate only the finest products, maintaining the highest standards of quality and craftsmanship.',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: 'i-lucide-leaf',
    title: 'Sustainability',
    description:
      'Committed to eco-friendly practices and sustainable fashion that respects our planet.',
    gradient: 'from-green-500 to-green-600',
  },
  {
    icon: 'i-heroicons-shield-check',
    title: 'Trust & Transparency',
    description:
      'Building lasting relationships through honest communication and reliable service.',
    gradient: 'from-purple-500 to-purple-600',
  },
]
</script>

<template>
  <div class="bg-white py-20">
    <div class="mx-auto max-w-7xl px-6">
      <div class="mb-12 text-center">
        <h2 class="mb-4 text-4xl font-bold text-gray-900">Our Core Values</h2>
        <p class="mx-auto max-w-2xl text-xl text-gray-600">
          The principles that guide everything we do
        </p>
      </div>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="(value, i) in values" :key="i" class="group text-center">
          <div
            :class="`h-20 w-20 bg-linear-to-br ${value.gradient} mx-auto mb-6 flex items-center justify-center rounded-2xl shadow-lg transition-transform group-hover:scale-110`"
          >
            <UIcon :name="value.icon" class="h-10 w-10 text-white" />
          </div>
          <h3 class="mb-3 text-xl font-bold text-gray-900">{{ value.title }}</h3>
          <p class="text-gray-600">{{ value.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
