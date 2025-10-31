<template>
  <div class="flex flex-col gap-8">
    <Slider />
    <SalesOffer />
    <Categories />
  </div>
</template>

<script setup lang="ts">
import Slider from './components/Slider.vue'
import SalesOffer from './components/SalesOffer.vue'
import Categories from './components/Categories.vue'
definePageMeta({
  layout: 'default',
  alias: '/',
})
</script>
