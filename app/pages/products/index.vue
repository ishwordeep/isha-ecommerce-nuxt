<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap items-end justify-between gap-4 border-y border-y-gray-300 py-4">
      <div class="flex flex-col space-y-5">
        <h2 class="text-back text-xl font-medium">All Products</h2>
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
        <UiProductCard v-for="(i, index) in 12" :key="index" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const sortBy = ref('bestMatch')

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
const breadcrumbs = ref([
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'All Products',
    to: '/products',
  },
])
</script>
