<template>
  <div class="mx-auto w-full max-w-[500px] flex-1">
    <UCarousel
      ref="carousel"
      v-slot="{ item }"
      :items="images"
      class="mx-auto w-full"
      @select="onSelect"
    >
      <NuxtImg :src="item" class="aspect-[4/3] h-full w-full object-fill" />
    </UCarousel>

    <!-- Thumbnails -->
    <div class="group relative mt-4">
      <div
        ref="thumbContainer"
        class="scrollbar-hide flex justify-center gap-4 overflow-x-auto scroll-smooth py-4"
      >
        <div
          v-for="(item, index) in images"
          :key="index"
          class="size-11 cursor-pointer opacity-25 transition-all hover:opacity-100"
          :class="{ 'opacity-100': activeIndex === index }"
          @click="select(index)"
        >
          <NuxtImg :src="item" class="aspect-square min-w-[50px] rounded-sm" />
        </div>
      </div>

      <!-- Left Arrow -->
      <UButton
        @click="scrollThumbnails('left')"
        class="absolute top-1/2 -left-2 -translate-y-1/2 rounded-full opacity-0 transition group-hover:opacity-100"
        size="xs"
        square
      >
        <UIcon name="i-heroicons-chevron-left" class="size-4" />
      </UButton>

      <!-- Right Arrow -->
      <UButton
        @click="scrollThumbnails('right')"
        class="absolute top-1/2 -right-2 -translate-y-1/2 rounded-full opacity-0 transition group-hover:opacity-100"
        size="xs"
        square
      >
        <UIcon name="i-heroicons-chevron-right" class="size-4" />
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const images = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6',
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6',
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6',
]

const carousel = useTemplateRef('carousel')
const activeIndex = ref(0)
const thumbContainer = ref<HTMLElement | null>(null)

function onSelect(index: number) {
  activeIndex.value = index
}

function select(index: number) {
  activeIndex.value = index

  carousel.value?.emblaApi?.scrollTo(index)
}

const scrollThumbnails = (direction: 'left' | 'right') => {
  const container = thumbContainer.value
  if (!container) return
  const scrollAmount = 150
  container.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth',
  })
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
