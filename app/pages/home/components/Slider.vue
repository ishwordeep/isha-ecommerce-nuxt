<script setup lang="ts">
const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6',
]
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    dots
    loop
    :items="items"
    class="w-full"
    arrows
    :autoplay="{ delay: 4000 }"
    :ui="{
      dots: '!bottom-4',
      prev: '!start-4',
      next: '!end-4',
    }"
  >
    <NuxtImg :src="item" class="aspect-[21/9] h-full w-full object-fill sm:aspect-[25/9]" />
  </UCarousel>
</template>
