<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap items-end justify-between gap-4 border-y border-y-gray-300 py-4">
      <div class="flex flex-col space-y-5">
        <h2 class="text-2xl font-medium text-black md:text-4xl">
          {{ title }}
        </h2>
        <UBreadcrumb :items="breadcrumbs" />
      </div>

      <USelect
        v-model="sortBy"
        :items="sortOptions"
        :ui="{
          base: 'max-w-[200px]',
        }"
      />
    </div>

    <div class="flex items-start gap-6">
      <div class="flex max-w-[200px] min-w-[200px] flex-col space-y-4 max-md:hidden">
        <UiBrowseByCategories />
      </div>
      <div
        class="grid w-full grid-cols-1 justify-center gap-2 min-[450px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-4"
      >
        <UiProductSkeletonCard v-if="isLoading" v-for="n in 8" :key="n" />

        <UiProductCard2
          v-else
          v-for="product in collectionProducts"
          :product="product"
          :key="product._id"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore, type ProductFlag } from '~/stores/product.store'

type flags = 'new' | 'trending' | 'featured'

const route = useRoute()
const productStore = useProductStore()
const isLoading = ref(true)

const sortBy = ref('bestMatch')
const flag = route.params.type as string

const collectionProducts = computed(() => productStore.flagCollections[flag as flags] || [])

const title = computed(() => {
  return flag
    ? flag.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
    : 'All Products'
})

const sortOptions = ref([
  {
    label: 'Best Match',
    value: 'bestMatch',
  },
  {
    label: 'Newest',
    value: 'newest',
  },
  {
    label: 'Oldest',
    value: 'oldest',
  },
  {
    label: 'Price: High To Low',
    value: 'desc:price',
  },
  {
    label: 'Price: Low To High',
    value: 'asc:price',
  },
])
const breadcrumbs = computed(() => [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: title.value,
    to: '#',
  },
])

watchEffect(async () => {
  const type = route.params.type as string
  if (!type) return

  isLoading.value = true
  try {
    await productStore.fetchProductsByFlags(type as ProductFlag)
  } finally {
    isLoading.value = false
  }
})
</script>
