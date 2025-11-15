<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap items-end justify-between gap-4 border-y border-y-gray-300 py-4">
      <div class="flex flex-col space-y-5">
        <h2 class="text-2xl font-medium text-black md:text-4xl">All Products</h2>
        <UBreadcrumb :items="breadcrumbs" />
      </div>

      <USelect
        v-model="state.sortBy"
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
        class="grid w-full grid-cols-1 justify-center gap-2 min-[420px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-4"
      >
        <UiProductCard
          v-for="product in productStore.products"
          :product="product"
          :key="product._id"
        />
      </div>
    </div>

    <!-- Loading More Spinner -->
    <div v-if="state.isLoadingMore" class="col-span-full py-12 text-center">
      <USpinner size="xl" />
    </div>

    <!-- Infinite Scroll Trigger -->
    <div v-if="hasMore && !state.isLoadingMore" ref="loadMoreTrigger" class="h-10" />
  </div>
</template>

<script setup lang="ts">
const state = reactive({
  sortBy: 'bestMatch' as string,
  isLoadingMore: false,
})

const loadMoreTrigger = ref<HTMLElement | null>(null)
const currentPage = ref(1)
const observer = ref<IntersectionObserver | null>(null)

const queryParams = computed(() => ({
  page: currentPage.value,
  limit: 24,
  search: '',
  sort: state.sortBy,
}))

const hasMore = computed(() => {
  const p = productStore.pagination
  if (!p) return false
  // Check if current page is less than total pages
  return p.page < p.pages
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

const productStore = useProductStore()
const isLoading = ref(true)

// Setup intersection observer
function setupInfiniteScroll() {
  if (!process.client) return

  // Disconnect existing observer
  if (observer.value) {
    observer.value.disconnect()
  }

  observer.value = new IntersectionObserver(
    async ([entry]) => {
      if (entry?.isIntersecting && hasMore.value && !state.isLoadingMore) {
        await loadMore()
      }
    },
    {
      rootMargin: '200px',
      threshold: 0.1,
    }
  )

  // Observe the trigger element
  nextTick(() => {
    if (loadMoreTrigger.value) {
      observer.value?.observe(loadMoreTrigger.value)
    }
  })
}

// Load more products
async function loadMore() {
  if (state.isLoadingMore || !hasMore.value) return

  state.isLoadingMore = true
  currentPage.value += 1

  try {
    await productStore.loadMoreProducts({
      ...queryParams.value,
      page: currentPage.value,
    })
  } catch (error) {
    console.error('Error loading more products:', error)
    currentPage.value -= 1 // Revert page increment on error
  } finally {
    state.isLoadingMore = false
  }
}

// Initial load
onMounted(async () => {
  isLoading.value = true
  currentPage.value = 1
  await productStore.fetchProducts({ ...queryParams.value, page: 1 })
  isLoading.value = false
  setupInfiniteScroll()
})

// Watch for sort changes
watch(
  () => state.sortBy,
  async () => {
    currentPage.value = 1
    isLoading.value = true
    await productStore.fetchProducts({ ...queryParams.value, page: 1 })
    isLoading.value = false
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Reinitialize observer after sort
    setupInfiniteScroll()
  }
)

// Watch for trigger element changes
watch(
  () => loadMoreTrigger.value,
  (newVal) => {
    if (newVal && observer.value) {
      observer.value.observe(newVal)
    }
  }
)

// Cleanup
onUnmounted(() => {
  observer.value?.disconnect()
})
</script>
