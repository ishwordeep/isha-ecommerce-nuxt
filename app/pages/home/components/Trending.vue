<template>
  <div class="mt-8" v-if="!isLoading && productStore.flagCollections.trending?.length">
    <SectionHeader :collection="collection" />

    <div class="mt-8 flex flex-col items-center justify-center gap-2">
      <div
        class="grid w-full grid-cols-1 place-items-center gap-x-2 gap-y-4 min-[360px]:grid-cols-2 sm:gap-4 md:gap-6 lg:grid-cols-4"
      >
        <template v-if="isLoading">
          <ProductSkeletonCard v-for="i in 4" :key="i" />
        </template>
        <FlagProductsCard
          v-else
          :collection="collection"
          v-for="product in productStore.flagCollections.trending"
          :product="product"
          :key="product._id"
        />
      </div>
      <!--View All Button-->
      <div class="mt-8 text-center">
        <UButton
          to="/products/collection/trending"
          viewTransition
          class="rounded-xl bg-gradient-to-r px-8 py-4 font-bold hover:scale-105 hover:shadow-xl"
          :class="collection.gradient"
          trailingIcon="i-lucide-arrow-right"
          :ui="{
            trailingIcon: 'h-5 w-5',
          }"
          :label="'View All ' + collection.title"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/stores/product.store'
import FlagProductsCard from '~/components/ui/FlagProductsCard.vue'
import SectionHeader from '~/components/ui/SectionHeader.vue'
import ProductSkeletonCard from '~/components/ui/ProductSkeletonCard.vue'

const productStore = useProductStore()
const isLoading = ref(true)
const collection = {
  title: 'Trending Now',
  type: 'trending',
  description:
    "What everyone's loving right now. Shop the most popular pieces flying off our shelves this week.",
  gradient: 'from-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400',
  iconName: 'i-lucide-trending-up',
  badge: 'Hot',
  color: '#F59E0B',
}

onMounted(async () => {
  if (!productStore.trending?.length) {
    await productStore.fetchProductsByFlags('trending')
  }
  isLoading.value = false
})
</script>
