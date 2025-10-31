<template>
  <div>
    <UBreadcrumb :items="breadcrumbs" />
    <hr class="my-4 border-gray-300" />

    <div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
      <!--Images-->
      <ProductImages />

      <div class="flex flex-col space-y-6">
        <h3 class="text-md font-bold md:text-lg 2xl:text-xl">Bootcut Jeans</h3>
        <p>
          Category
          <ULink to="/products/category" class="text-blue-500" viewTransition>Men's Clothing</ULink>
        </p>

        <p
          class="text-md text-primary border-y border-y-gray-300 py-4 font-bold md:text-lg 2xl:text-xl"
        >
          Rs. 3500 &nbsp; <span class="text-secondary line-through">Rs. 4000</span>
        </p>

        <UFormField name="quantity" label="Quantity">
          <UInputNumber v-model="quantity" :min="1" class="max-w-32" />
        </UFormField>

        <div class="flex space-x-2">
          <UButton label="Add To Cart" class="max-w-32 justify-center" />
          <UButton icon="i-lucide-heart" variant="outline" />
          <UButton icon="i-lucide-share-2" variant="outline" />
        </div>

        <UBadge color="error" class="max-w-max" variant="soft" size="xl">Save Rs. 500</UBadge>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductImages from '~/pages/products/[category]/components/ProductImages.vue'

const quantity = ref(1)

const breadcrumbs = ref([
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Category',
    to: '/products/category',
  },
  {
    label: 'Product',
    to: '/products/category/product',
  },
])
</script>
