<template>
  <AboutUs />
</template>
<script lang="ts" setup>
import AboutUs from '~/views/about/index.vue'

const aboutStore = useAboutStore()

await useAsyncData('about-us', () => aboutStore.fetchAbout())

useAboutSeo(computed(() => aboutStore.about))
</script>
