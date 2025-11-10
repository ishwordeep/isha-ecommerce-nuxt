<template>
  <div>
    <div class="flex flex-col gap-6">
      <div class="flex flex-wrap items-end justify-between gap-4 border-y border-y-gray-300 py-4">
        <div class="flex flex-col space-y-5">
          <h2 class="text-2xl font-medium text-black md:text-4xl">
            {{ productStore.currentCategory || 'All Products' }}
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

      <div class="flex gap-6">
        <div class="flex max-w-[200px] min-w-[200px] flex-col space-y-4 max-md:hidden">
          <UiBrowseByCategories />
        </div>
        <div
          class="grid w-full grid-cols-1 justify-center gap-2 min-[450px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-4"
        >
          <template v-if="isLoading">
            <UiProductSkeletonCard v-for="i in 8" :key="i" />
          </template>

          <UiProductCard
            v-else
            v-for="product in productStore.categoryProducts"
            :product="product"
            :key="product._id"
          />
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

const route = useRoute()

const breadcrumbs = ref([
  {
    label: 'Home',
    to: '/',
  },
  {
    label: productStore.currentCategory || 'Category',
    to: '#',
  },
])

watchEffect(async () => {
  const categoryId = route.params.category?.toString()
  if (!categoryId) return

  isLoading.value = true
  try {
    await productStore.fetchProductsByCategory(categoryId)
  } finally {
    isLoading.value = false
  }
})
</script>
