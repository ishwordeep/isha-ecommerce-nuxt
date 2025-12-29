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
    <div
      class="grid w-full grid-cols-1 place-items-center gap-x-2 gap-y-4 min-[400px]:grid-cols-2 sm:gap-4 md:gap-6 lg:grid-cols-4"
    >
      <UiProductSkeletonCard v-if="isLoading" v-for="n in 8" :key="n" />
      <UiProductCard2 v-for="product in products" :product="product" v-else />
    </div>
  </div>
</template>
