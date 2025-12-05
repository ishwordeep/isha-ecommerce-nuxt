<template>
  <Checkout />
</template>

<script lang="ts" setup>
import Checkout from '~/views/checkout/index.vue'
definePageMeta({
  layout: 'auth',
  pageHeading: 'Checkout',
})
</script>
