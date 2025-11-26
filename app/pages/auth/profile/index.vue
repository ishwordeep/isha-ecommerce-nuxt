<template>
  <Profile />
</template>
<script lang="ts" setup>
import Profile from '~/views/auth/profile/index.vue'
definePageMeta({
  layout: 'auth',
  pageHeading: 'Account Overview',
})
</script>
