<template>
  <div>
    <div class="flex flex-col gap-6">
      <div class="flex flex-wrap items-end justify-between gap-4 border-b border-b-gray-300 py-4">
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
          class="grid w-full grid-cols-1 justify-center gap-2 min-[380px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-4"
        >
          <UiProductSkeletonCard v-if="isLoading" v-for="n in 8" :key="n" />

          <UiProductCard2
            v-else-if="productStore.categoryProducts?.length && !isLoading"
            v-for="product in productStore.categoryProducts"
            :product="product"
            :key="product._id"
          />

          <div v-else class="col-span-full py-20 text-center text-gray-500">
            No products found in this category.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sortOptions } from '~/utils/sortOptions'

const sortBy = ref('bestMatch')

const productStore = useProductStore()
const isLoading = ref(true)

import { unref } from 'vue'

const title = computed(() => unref(productStore.currentCategory) ?? 'All Products')

const route = useRoute()

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
  const categoryId = route.params.id?.toString()
  if (!categoryId) return

  isLoading.value = true
  try {
    await productStore.fetchProductsByCategory(categoryId)
  } finally {
    isLoading.value = false
  }
})
</script>
