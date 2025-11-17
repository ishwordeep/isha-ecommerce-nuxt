<script setup lang="ts">
// Stats
const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '50K+', label: 'Happy Customers' },
  { value: '1000+', label: 'Products' },
  { value: '25+', label: 'Countries' },
]

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

// Team Members
const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    image: '👩‍💼',
    bio: 'Visionary leader with 15+ years in fashion industry',
  },
  {
    name: 'Michael Chen',
    role: 'Creative Director',
    image: '👨‍🎨',
    bio: 'Award-winning designer passionate about innovation',
  },
  {
    name: 'Emma Williams',
    role: 'Head of Operations',
    image: '👩‍💻',
    bio: 'Expert in supply chain and customer experience',
  },
  {
    name: 'David Martinez',
    role: 'Marketing Director',
    image: '👨‍💼',
    bio: 'Strategic thinker building global brand presence',
  },
]

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
  <div>
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-[#F6F3E8]">
      <div class="mx-auto max-w-7xl px-6 py-20 text-center">
        <UButton color="primary" variant="solid" size="sm" class="mb-6 rounded-full">
          Our Story
        </UButton>
        <h1 class="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">About Fashion Store</h1>
        <p class="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
          We're not just a fashion retailer – we're a community of style enthusiasts dedicated to
          bringing you the finest clothing and accessories from around the world.
        </p>
      </div>
      <div
        class="absolute top-0 right-0 h-64 w-64 rounded-full bg-gradient-to-br from-blue-200/40 to-purple-200/40 blur-3xl"
      />
      <div
        class="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gradient-to-tr from-orange-200/40 to-pink-200/40 blur-3xl"
      />
    </div>

    <!-- Stats Section -->
    <div class="mx-auto mt-12 max-w-7xl px-6">
      <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
        <UCard
          v-for="(stat, i) in stats"
          :key="i"
          class="text-center transition-shadow hover:shadow-xl"
        >
          <h3 class="text-primary-600 mb-2 text-4xl font-bold">{{ stat.value }}</h3>
          <p class="font-medium text-gray-600">{{ stat.label }}</p>
        </UCard>
      </div>
    </div>

    <!-- Mission & Vision -->
    <div class="mx-auto max-w-7xl px-6 py-20">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <UCard class="transition-shadow hover:shadow-lg">
          <template #header>
            <div
              class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg"
            >
              <UIcon name="i-lucide-target" class="h-8 w-8 text-white" />
            </div>
          </template>
          <h2 class="mb-4 text-3xl font-bold text-gray-900">Our Mission</h2>
          <p class="mb-4 text-lg text-gray-700">
            To empower individuals to express their unique style through carefully curated fashion
            that combines quality, affordability, and sustainability.
          </p>
          <p class="text-gray-600">
            We believe fashion should be accessible to everyone, without compromising on quality or
            ethics.
          </p>
        </UCard>

        <UCard class="transition-shadow hover:shadow-lg">
          <template #header>
            <div
              class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg"
            >
              <UIcon name="i-heroicons-sparkles" class="h-8 w-8 text-white" />
            </div>
          </template>
          <h2 class="mb-4 text-3xl font-bold text-gray-900">Our Vision</h2>
          <p class="mb-4 text-lg text-gray-700">
            To become the world's most trusted and loved fashion destination, setting new standards
            for customer experience and sustainable retail.
          </p>
          <p class="text-gray-600">
            We envision a future where style meets sustainability, and every purchase makes a
            positive impact.
          </p>
        </UCard>
      </div>
    </div>

    <!-- Core Values -->
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
              :class="`h-20 w-20 bg-gradient-to-br ${value.gradient} mx-auto mb-6 flex items-center justify-center rounded-2xl shadow-lg transition-transform group-hover:scale-110`"
            >
              <UIcon :name="value.icon" class="h-10 w-10 text-white" />
            </div>
            <h3 class="mb-3 text-xl font-bold text-gray-900">{{ value.title }}</h3>
            <p class="text-gray-600">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline / Our Journey -->
    <div class="mx-auto max-w-[1440px] px-6 py-20">
      <div class="mb-12 text-center">
        <h2 class="mb-4 text-4xl font-bold text-gray-900">Our Journey</h2>
        <p class="mx-auto max-w-2xl text-xl text-gray-600">
          A decade of growth, innovation, and impact
        </p>
      </div>

      <div class="relative">
        <div
          class="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 transform bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 md:block"
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
                <div
                  class="mb-4 inline-block rounded-full bg-blue-600 px-4 py-2 font-bold text-white"
                >
                  {{ milestone.year }}
                </div>
                <h3 class="mb-2 text-2xl font-bold text-gray-900">{{ milestone.title }}</h3>
                <p class="text-gray-600">{{ milestone.description }}</p>
              </div>
            </div>

            <div
              class="z-10 hidden h-4 w-4 rounded-full border-4 border-white bg-blue-600 shadow-lg md:block"
            />

            <div class="flex-1" />
          </div>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="bg-white py-20">
      <div class="mx-auto max-w-7xl px-6">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-4xl font-bold text-gray-900">Meet Our Team</h2>
          <p class="mx-auto max-w-2xl text-xl text-gray-600">
            The passionate people behind Fashion Store
          </p>
        </div>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <UCard
            v-for="(member, i) in team"
            :key="i"
            class="overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl"
          >
            <div
              class="flex aspect-square items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 text-8xl"
            >
              {{ member.image }}
            </div>
            <div class="p-6 text-center">
              <h3 class="mb-1 text-xl font-bold text-gray-900">{{ member.name }}</h3>
              <p class="text-primary-600 mb-3 font-medium">{{ member.role }}</p>
              <p class="text-sm text-gray-600">{{ member.bio }}</p>
            </div>
          </UCard>
        </div>
      </div>
    </div>

    <!-- Why Choose Us -->
    <div
      class="my-12 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 text-center text-white"
    >
      <h2 class="mb-6 text-4xl font-bold">Why Choose Fashion Store?</h2>
      <p class="mx-auto mb-12 max-w-3xl text-xl text-blue-100">
        We're more than just an online store. We're your fashion partner, committed to your style
        journey.
      </p>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div class="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
          <div
            class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20"
          >
            <UIcon name="i-lucide-trending-up" class="h-6 w-6" />
          </div>
          <h3 class="mb-3 text-xl font-bold">Trending Collections</h3>
          <p class="text-blue-100">
            Stay ahead with our curated selection of the latest fashion trends
          </p>
        </div>
        <div class="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
          <div
            class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20"
          >
            <UIcon name="i-heroicons-users" class="h-6 w-6" />
          </div>
          <h3 class="mb-3 text-xl font-bold">Community Driven</h3>
          <p class="text-blue-100">Join a community of 50,000+ fashion enthusiasts worldwide</p>
        </div>
        <div class="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
          <div
            class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20"
          >
            <UIcon name="i-heroicons-globe-alt" class="h-6 w-6" />
          </div>
          <h3 class="mb-3 text-xl font-bold">Global Reach</h3>
          <p class="text-blue-100">Fast shipping to 25+ countries with local support</p>
        </div>
      </div>
      <UButton
        size="xl"
        class="dark mt-12"
        color="neutral"
        label="Start Shopping Now"
        to="/products"
        viewTransition
      />
    </div>
  </div>
</template>
