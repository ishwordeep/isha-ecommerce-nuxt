<template>
  <div class="from-tertiary grid place-items-center bg-linear-to-b to-white py-8 sm:p-4 lg:p-12">
    <div class="grid w-full grid-cols-2 gap-8 px-2 sm:grid-cols-2 sm:px-4 lg:grid-cols-4">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="flex flex-col items-center gap-4 text-center"
      >
        <div class="flex items-center justify-center rounded-full bg-white p-4 text-4xl shadow-md">
          <UIcon :name="item.icon" class="text-2xl" />
        </div>
        <h3 class="font-semibold sm:text-lg">{{ item.heading }}</h3>
        <p class="text-gray-600 max-sm:text-sm">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = ref([
  {
    heading: 'Free Shipping ',
    description: 'Enjoy free shipping on all orders over $50.',
    icon: 'i-lucide-truck',
  },
  {
    heading: '24/7 Support',
    description: 'Our support team is here to help you anytime, anywhere.',
    icon: 'i-lucide-headphones',
  },
  {
    heading: 'Secure Payment',
    description: 'We offer safe and secure payment options.',
    icon: 'i-lucide-shield-check',
  },
  {
    heading: 'Seamless Shopping',
    description: 'Experience a smooth and easy shopping process.',
    icon: 'i-lucide-shopping-cart',
  },
])
</script>

<style scoped>
@reference 'tailwindcss';
</style>
