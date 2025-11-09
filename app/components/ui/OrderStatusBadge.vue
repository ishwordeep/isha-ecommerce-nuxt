<script setup lang="ts">
interface Props {
  status: string
}

defineProps<Props>()

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'bg-green-100 text-green-700'
    case 'shipped':
      return 'bg-blue-100 text-blue-700'
    case 'processing':
      return 'bg-yellow-100 text-yellow-700'
    case 'cancelled':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}
</script>

<template>
  <span
    class="rounded-full px-3 py-1 text-xs font-medium capitalize"
    :class="getStatusColor(status)"
  >
    {{ status }}
  </span>
</template>
