<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const isLoading = ref(true)
const sliderStore = useSliderStore()
const skeletonItems = [1, 2, 3]
onMounted(async () => {
  if (!sliderStore.sliders?.length) {
    await sliderStore.fetchSliders()
    isLoading.value = false
  } else {
    isLoading.value = false
  }
})

const isMdUp = useMediaQuery('(min-width: 768px)')
</script>

<template>
  <UCarousel
    v-if="isLoading"
    :items="skeletonItems"
    v-slot="{ item }"
    dots
    loop
    class="w-full"
    :arrows="isMdUp"
    :ui="{
      dots: '!bottom-4',
      prev: '!start-4',
      next: '!end-4',
    }"
  >
    <USkeleton
      :key="item"
      class="aspect-[4/3] w-full rounded-lg sm:aspect-[16/9] xl:aspect-[21/9]"
    />
  </UCarousel>
  <UCarousel
    v-else
    v-slot="{ item }"
    dots
    loop
    :items="sliderStore.sliders?.map((slider) => slider.image) ?? []"
    class="w-full"
    :arrows="isMdUp"
    :autoplay="{ delay: 4000 }"
    :ui="{
      dots: '!bottom-4',
      prev: '!start-4',
      next: '!end-4',
    }"
  >
    <NuxtImg
      :src="item"
      loading="lazy"
      class="aspect-[4/3] h-full w-full object-cover sm:aspect-[16/9] xl:aspect-[21/9]"
    />
  </UCarousel>
</template>
