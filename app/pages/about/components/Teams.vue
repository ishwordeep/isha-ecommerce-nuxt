<script setup lang="ts">
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
</script>

<template>
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
          <div class="pt-6 text-center">
            <h3 class="mb-1 text-xl font-bold text-gray-900">{{ member.name }}</h3>
            <p class="text-primary-600 mb-3 font-medium">{{ member.role }}</p>
            <p class="text-sm text-gray-600">{{ member.bio }}</p>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
