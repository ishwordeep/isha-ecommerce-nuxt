<template>
  <Orders />
</template>
<script lang="ts" setup>
import Orders from '~/views/auth/orders/index.vue'

definePageMeta({
  layout: 'auth',
  pageHeading: 'My Orders',
})
</script>
