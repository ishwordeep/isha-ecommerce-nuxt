<template>
  <Wishlist />
</template>
<script lang="ts" setup>
import Wishlist from '~/views/auth/wishlist/index.vue'

definePageMeta({
  layout: 'auth',
  pageHeading: 'My Wishlist',
})
</script>
