<script setup lang="ts">
import { useMediaQuery } from '~/composables/useMediaQuery'
import type { SliderResponse } from '~/services/slider.service'

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
    v-if="isLoading && !sliderStore.sliders?.length"
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
      viewport: 'rounded-xl',
    }"
  >
    <USkeleton :key="item" class="aspect-4/3 w-full rounded-xl sm:aspect-video xl:aspect-21/9" />
  </UCarousel>
  <UCarousel
    v-else
    v-slot="{ item }"
    dots
    loop
    :items="sliderStore.sliders?.map((slider: SliderResponse) => slider.image) ?? []"
    class="w-full"
    :arrows="isMdUp"
    :autoplay="{ delay: 4000 }"
    :ui="{
      dots: '!bottom-4',
      prev: '!start-4',
      next: '!end-4',
      viewport: 'rounded-xl',
    }"
  >
    <NuxtImg
      :src="item"
      loading="lazy"
      class="aspect-4/3 h-full w-full rounded-xl object-cover sm:aspect-video xl:aspect-21/9"
    />
  </UCarousel>
</template>
