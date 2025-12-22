<template>
  <div v-if="!isLoading && productStore.flagCollections.new?.length" class="mt-8">
    <SectionHeader :collection="collection" />

    <div class="mt-8 flex flex-col items-center justify-center gap-2">
      <div
        class="grid w-full grid-cols-1 place-items-center gap-x-2 gap-y-4 min-[380px]:grid-cols-2 sm:gap-4 md:gap-6 lg:grid-cols-4"
      >
        <template v-if="isLoading">
          <ProductSkeletonCard v-for="i in 4" :key="i" />
        </template>

        <ProductCard
          v-else
          :collection="collection"
          v-for="product in productStore.flagCollections.new.slice(0, 4)"
          :product="product"
          :key="product._id"
        />
      </div>
      <!--View All Button-->
      <div class="mt-8 text-center">
        <UButton
          to="products/collection/new"
          viewTransition
          class="rounded-xl bg-linear-to-r px-8 py-4 font-bold hover:scale-105 hover:shadow-xl"
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
import ProductCard from '~/components/ui/ProductCard.vue'
import ProductSkeletonCard from '~/components/ui/ProductSkeletonCard.vue'
import SectionHeader from '~/components/ui/SectionHeader.vue'
import { useProductStore } from '~/stores/product.store'

const productStore = useProductStore()
const isLoading = ref(true)
const collection = {
  title: 'New Arrivals',
  type: 'newArrivals',
  description: 'Check out the latest additions to our collection.',
  gradient: 'from-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700',
  iconName: 'i-lucide-clock',
  badge: 'Just In ',
  color: '#3B82F6',
}

onMounted(async () => {
  if (!productStore.newArrivals?.length) {
    await productStore.fetchProductsByFlags('new')
  }
  isLoading.value = false
})
</script>
