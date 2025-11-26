<template>
  <div v-if="!isLoading && productStore.flagCollections.featured?.length" class="mt-8">
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
          v-for="product in productStore.flagCollections.featured.slice(0, 4)"
          :product="product"
          :key="product._id"
        />
      </div>
      <!--View All Button-->
      <div class="mt-8 text-center">
        <UButton
          to="/products/collection/featured"
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
  title: 'Featured Picks',
  type: 'featured',
  description:
    "Handpicked by our stylists. Curated selections that define this season's must-have wardrobe essentials.",
  gradient: 'from-purple-500 to-purple-600 hover:from-purple-500 hover:to-purple-700',
  iconName: 'i-lucide-star',
  badge: "Editor's Choice",
  color: '#8B5CF6',
}

onMounted(async () => {
  if (!productStore.featured?.length) {
    await productStore.fetchProductsByFlags('featured')
  }
  isLoading.value = false
})
</script>
