<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <div class="h-[36px] w-1 bg-gradient-to-b from-gray-100 to-black"></div>
        <h1 class="text-2xl font-bold">Sales and offer</h1>
      </div>

      <UButton variant="link" trailing-icon="i-lucide-arrow-right" size="md"> See More </UButton>
    </div>
    <div class="xs:grid-cols-2 grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-3 xl:grid-cols-4">
      <UiProductCard v-for="(i, index) in 12" :key="index" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
