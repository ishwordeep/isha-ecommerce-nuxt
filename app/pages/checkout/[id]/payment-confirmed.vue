<template>
  <Confirmed
    :title="'Payment Confirmed'"
    :description="'Your payment has been successfully processed.'"
  />
</template>

<script lang="ts" setup>
import Confirmed from '~/views/checkout/Confirmed.vue'
definePageMeta({
  layout: 'auth',
})
</script>
