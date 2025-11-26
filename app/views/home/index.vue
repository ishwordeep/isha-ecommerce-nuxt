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
import SectionHero from '~/components/ui/SectionHero.vue'
import AllProducts from './components/AllProducts.vue'
import Categories from './components/Categories.vue'
import Descriptions from './components/Descriptions.vue'
import Featured from './components/Featured.vue'
import NewArrivals from './components/NewArrivals.vue'
import Newsletter from './components/Newsletter.vue'
import Slider from './components/Slider.vue'
import Trending from './components/Trending.vue'

const collectionSection = ref({
  title: 'Discover Your Style',
  description:
    'Explore our curated collections and find the perfect pieces to express your unique fashion sense.',
})
</script>
