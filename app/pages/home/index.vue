<template>
  <div class="flex flex-col gap-8">
    <Slider />
    <Descriptions />
    <SectionHero :section="collectionSection" />
    <NewArrivals />
    <Trending />
    <Featured />
    <Newsletter />
    <Categories />
    <AllProducts />
  </div>
</template>

<script setup lang="ts">
import Slider from './components/Slider.vue'
import Categories from './components/Categories.vue'
import NewArrivals from './components/NewArrivals.vue'
import Trending from './components/Trending.vue'
import Descriptions from '~/pages/home/components/Descriptions.vue'
import Featured from '~/pages/home/components/Featured.vue'
import SectionHero from '~/components/ui/SectionHero.vue'
import AllProducts from '~/pages/home/components/AllProducts.vue'
import Newsletter from '~/pages/home/components/Newsletter.vue'

definePageMeta({
  layout: 'default',
  alias: '/',
})

const collectionSection = ref({
  title: 'Discover Your Style',
  description:
    'Explore our curated collections and find the perfect pieces to express your unique fashion sense.',
})
</script>
