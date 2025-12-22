<script setup lang="ts">
const aboutStore = useAboutStore()
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
        <div v-for="(item, i) in aboutStore.about?.coreValues" :key="i" class="group text-center">
          <div
            class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-b shadow-lg transition-transform group-hover:scale-110"
            :class="item.color"
          >
            <UIcon :name="item.icon" class="h-10 w-10 text-white" />
          </div>
          <h3 class="mb-3 text-xl font-bold text-gray-900">{{ item.title }}</h3>
          <p class="text-gray-600">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
