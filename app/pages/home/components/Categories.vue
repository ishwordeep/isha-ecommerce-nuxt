<template>
  <div class="mt-4 flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <div class="h-[36px] w-1 bg-gradient-to-b from-gray-100 to-black"></div>
      <h1 class="text-2xl font-bold">Categories</h1>
    </div>

    <div
      class="grid grid-cols-1 gap-4 min-[350px]:grid-cols-2 sm:gap-8 md:grid-cols-3 xl:grid-cols-4"
    >
      <div
        class="relative aspect-square max-w-[200px] min-w-[200px] overflow-hidden rounded-lg"
        :ui="{ root: 'p-0' }"
      >
        <NuxtImg src="https://picsum.photos/640/640?random=2" class="aspect-square" />
        <div class="absolute bottom-0 w-full rounded-t-lg bg-white p-2 text-center text-sm">
          Category
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
