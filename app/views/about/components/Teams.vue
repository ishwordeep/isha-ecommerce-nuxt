<script setup lang="ts">
const aboutStore = useAboutStore()
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
      <div class="xs:grid-cols-2 grid grid-cols-1 gap-x-2 gap-y-4 sm:gap-4 lg:grid-cols-4">
        <UCard
          v-for="(member, i) in aboutStore.about?.team"
          :key="i"
          class="overflow-hidden border border-gray-200"
          :ui="{
            body: '!p-2',
          }"
        >
          <div
            class="flex aspect-square items-center justify-center bg-linear-to-br from-blue-100 to-purple-100 text-8xl"
          >
            <NuxtImg :src="member.imageUrl" :alt="member.name" class="h-full w-full object-cover" />
          </div>

          <div class="pt-6 text-center">
            <h3 class="mb-1 text-xl font-bold text-gray-900">{{ member.name }}</h3>
            <p class="text-primary-600 mb-3 font-medium">{{ member.titleRole }}</p>
            <p class="text-sm text-gray-600">{{ member.shortBio }}</p>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
