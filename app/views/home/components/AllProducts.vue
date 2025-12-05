<template>
  <section class="mb-12">
    <!-- Header -->
    <div class="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
      <div>
        <h2 class="mb-2 text-4xl font-bold text-gray-900">All Products</h2>
        <p class="text-gray-600">Discover our complete collection of premium fashion items</p>
      </div>
      <UButton
        to="/products"
        variant="outline"
        class="rounded-xl border-2 border-gray-900 px-6 py-3 font-bold text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white"
      >
        View All Products
      </UButton>
    </div>

    <!-- Product Grid -->
    <div
      class="grid w-full grid-cols-1 place-items-center gap-x-2 gap-y-4 min-[380px]:grid-cols-2 sm:gap-4 md:gap-6 lg:grid-cols-4"
    >
      <HomeProductCard
        v-for="product in productStore.products"
        :key="product._id"
        :product="product"
      />
    </div>

    <!-- Load More -->
    <div class="mt-12 text-center">
      <UButton
        @click="loadMore"
        :loading="loadingMore"
        size="xl"
        class="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-gray-900 to-gray-800 px-10 py-4 font-bold text-white transition-all duration-300 hover:scale-105 hover:from-gray-900 hover:to-gray-950 hover:shadow-2xl disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-700"
        :disabled="(productStore.products?.length || 0) >= (productStore.pagination?.total || 0)"
      >
        Load More Products
        <UIcon name="i-lucide-arrow-right" class="h-5 w-5" />
      </UButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import HomeProductCard from '~/components/ui/HomeProductCard.vue'

const isLoading = ref(true)
const loadingMore = ref(false)
const productStore = useProductStore()
const currentPage = ref(1)

onMounted(async () => {
  if (!productStore.products?.length) {
    await productStore.fetchProducts({
      page: 1,
      limit: 12,
    })
  }
  isLoading.value = false
})

const loadMore = async () => {
  loadingMore.value = true
  currentPage.value += 1
  await productStore.loadMoreProducts({
    page: currentPage.value,
    limit: 12,
  })
  loadingMore.value = false
}
</script>
