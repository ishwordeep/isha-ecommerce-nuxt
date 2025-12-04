<script setup lang="ts">
const { products, fetchProducts, isLoading } = useProductStore()
const isFetching = ref(true)
onMounted(async () => {
  try {
    await fetchProducts({ limit: 8, page: 1 })
  } finally {
    isFetching.value = false
  }
})

const items = computed(() => products?.slice(0, 8) || [])

const isMdUp = useMediaQuery('(min-width: 768px)')
</script>

<template>
  <div class="mt-12 flex flex-col items-center justify-center gap-4 text-center text-black">
    <h4 class="text-xl font-semibold md:text-3xl xl:text-4xl">Related Products</h4>
    <UCarousel
      dots
      loop
      :items="items"
      class="w-full"
      :arrows="isMdUp"
      :autoplay="{ delay: 4000 }"
      :ui="{
        prev: '!start-4',
        next: '!end-4',
        viewport: 'rounded-xl',
        item: 'min-[450px]:basis-1/2 md:basis-1/3 min-[960px]:basis-1/5',
      }"
    >
      <template #default="{ item }">
        <UiProductSkeletonCard v-if="isLoading" v-for="n in 8" :key="n" />
        <UiProductCard :product="item" v-else />
      </template>
    </UCarousel>
  </div>
</template>
