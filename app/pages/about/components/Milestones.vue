<script setup lang="ts">
// Milestones
const milestones = [
  {
    year: '2015',
    title: 'The Beginning',
    description: 'Fashion Store was founded with a vision to revolutionize online fashion retail',
  },
  {
    year: '2017',
    title: 'Rapid Growth',
    description: 'Expanded to 10 countries and reached 10,000 customers',
  },
  {
    year: '2019',
    title: 'Sustainability Initiative',
    description: 'Launched eco-friendly product line and sustainable packaging',
  },
  {
    year: '2022',
    title: 'Innovation Award',
    description: 'Received Best E-commerce Platform award for customer experience',
  },
  {
    year: '2025',
    title: 'Global Presence',
    description: 'Now serving 50,000+ customers across 25 countries worldwide',
  },
]
</script>

<template>
  <div class="mx-auto max-w-[1440px] px-6 py-20">
    <div class="mb-12 text-center">
      <h2 class="mb-4 text-4xl font-bold text-gray-900">Our Journey</h2>
      <p class="mx-auto max-w-2xl text-xl text-gray-600">
        A decade of growth, innovation, and impact
      </p>
    </div>

    <div class="relative">
      <div
        class="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 transform bg-linear-to-b from-blue-200 via-purple-200 to-pink-200 md:block"
      />

      <div class="space-y-12">
        <div
          v-for="(milestone, idx) in milestones"
          :key="idx"
          :class="`flex flex-col items-center gap-8 md:flex-row ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`"
        >
          <div
            :class="`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center md:text-left`"
          >
            <div
              class="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-xl"
            >
              <div class="bg-primary mb-4 inline-block rounded-full px-4 py-2 font-bold text-white">
                {{ milestone.year }}
              </div>
              <h3 class="mb-2 text-2xl font-bold text-gray-900">{{ milestone.title }}</h3>
              <p class="text-gray-600">{{ milestone.description }}</p>
            </div>
          </div>

          <div
            class="bg-primary z-10 hidden h-4 w-4 rounded-full border-4 border-white shadow-lg md:block"
          />

          <div class="flex-1" />
        </div>
      </div>
    </div>
  </div>
</template>
