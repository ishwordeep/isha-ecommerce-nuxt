<script setup lang="ts">
import CoreValues from './components/CoreValues.vue'
import Milestones from './components/Milestones.vue'
import Mission from './components/Mission.vue'
import Teams from './components/Teams.vue'

// Stats
const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '50K+', label: 'Happy Customers' },
  { value: '1000+', label: 'Products' },
  { value: '25+', label: 'Countries' },
]

const aboutStore = useAboutStore()
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-[#F6F3E8]">
      <div class="mx-auto max-w-7xl p-6 text-center sm:py-10 lg:py-20">
        <UButton color="primary" variant="solid" size="sm" class="mb-6 rounded-full">
          {{ aboutStore.about?.hero.buttonText || 'Our Story' }}
        </UButton>
        <h1 class="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">
          {{ aboutStore.about?.hero.mainTitle || 'About Parish Jat Leo' }}
        </h1>
        <p class="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
          {{
            aboutStore.about?.hero.subtitle ||
            "We're not just a fashion retailer – we're a community of style enthusiasts dedicated to bringing you the finest clothing and accessories from around the world."
          }}
        </p>
      </div>
      <div
        class="absolute top-0 right-0 h-64 w-64 rounded-full bg-linear-to-br from-blue-200/40 to-purple-200/40 blur-3xl"
      />
      <div
        class="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-linear-to-tr from-orange-200/40 to-pink-200/40 blur-3xl"
      />
    </div>

    <!-- Stats Section -->
    <div
      class="mx-auto mt-12 grid grid-cols-2 gap-6 md:grid-cols-4"
      v-if="aboutStore.about?.hero?.stats?.length"
    >
      <UCard
        v-for="(stat, i) in aboutStore.about?.hero?.stats"
        :key="i"
        class="text-center transition-shadow hover:shadow-xl"
      >
        <h3 class="text-primary-600 mb-2 text-4xl font-bold">{{ stat.number }}</h3>
        <p class="font-medium text-gray-600">{{ stat.label }}</p>
      </UCard>
    </div>

    <!-- Mission & Vision -->
    <Mission />

    <!-- Core Values -->
    <CoreValues />
    <!-- Timeline / Our Journey -->
    <Milestones />

    <!-- Team Section -->
    <Teams />

    <!-- Why Choose Us -->
    <!-- <WhyChooseUs /> -->
  </div>
</template>
