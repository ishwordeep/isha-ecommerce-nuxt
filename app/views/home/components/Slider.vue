<script setup lang="ts">
import { useMediaQuery } from '~/composables/useMediaQuery'
import type { Button } from '~/services/slider.service'

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

const buttonStyles = (button: Button) => {
  const bg = button?.bgColor || '#3b82f6' // fallback blue
  const text = button?.textColor || '#ffffff'

  return {
    backgroundColor: bg,
    color: text,
    // Optional: add subtle border or glow
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3), 0 0 20px -5px currentColor',
    border: '2px solid transparent',
    backgroundClip: 'padding-box',
  }
}

// Darken any hex color on hover (works perfectly with random colors)
function darkenHex(hex: string, percent = 18) {
  if (!hex || !hex.startsWith('#')) return hex

  let r = parseInt(hex.slice(1, 3), 16)
  let g = parseInt(hex.slice(3, 5), 16)
  let b = parseInt(hex.slice(5, 7), 16)

  r = Math.max(0, Math.floor(r * (1 - percent / 100)))
  g = Math.max(0, Math.floor(g * (1 - percent / 100)))
  b = Math.max(0, Math.floor(b * (1 - percent / 100)))

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
}
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
    :items="sliderStore.sliders ?? []"
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
    <div class="relative aspect-video h-full w-full rounded-xl object-cover sm:aspect-21/9">
      <NuxtImg
        :src="item.image"
        loading="lazy"
        class="h-full w-full rounded-xl object-cover"
        format="webp"
        width="1920"
        height="1080"
      />
      <NuxtLink
        v-if="item.isButtonEnabled && item.button?.link"
        :to="item.button.link"
        class="group hover:shadow-3xl absolute right-4 bottom-6 z-10 flex items-center gap-3 overflow-hidden rounded-full px-4 py-2 font-bold tracking-wide shadow-2xl transition-all duration-300 hover:scale-110 focus:ring-4 focus:ring-white/50 focus:outline-none max-sm:text-sm sm:px-7 sm:py-4"
        :style="buttonStyles(item.button)"
        @mouseover="
          (e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = darkenHex(
              item.button!.bgColor,
              18
            ))
        "
        @mouseleave="
          (e) => ((e.currentTarget as HTMLElement).style.backgroundColor = item.button!.bgColor)
        "
      >
        {{ item.button.title }}
      </NuxtLink>
    </div>
  </UCarousel>
</template>
