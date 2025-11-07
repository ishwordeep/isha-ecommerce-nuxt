<template>
  <div>
    <UBreadcrumb :items="breadcrumbs" />
    <hr class="my-4 border-gray-300" />

    <div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
      <!--Images-->
      <ProductImages />

      <div class="flex flex-col space-y-4">
        <h3 class="text-md font-bold text-black md:text-lg 2xl:text-xl">Bootcut Jeans</h3>
        <p class="border-b-default border-b pb-4 text-sm md:text-base 2xl:text-lg">
          Category
          <ULink to="/products/category" class="text-blue-500" viewTransition>Men's Clothing</ULink>
        </p>

        <!--Colors-->
        <div class="border-b-default flex flex-col gap-1 border-b pb-4">
          <p class="mb-2 font-semibold">Select Color:</p>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="(color, index) in availableColors"
              :key="index"
              :style="{ backgroundColor: color }"
              @click="selectedColor = color"
              :class="[
                'h-8 w-8 cursor-pointer rounded-md border-2',
                selectedColor === color ? 'border-black' : 'border-gray-300',
              ]"
            ></div>
          </div>
        </div>

        <!--Sizes-->
        <div class="border-b-default flex flex-col gap-1 border-b pb-4">
          <p class="mb-2 font-semibold">Select Size:</p>
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="(size, index) in availableSizes"
              :key="index"
              @click="selectedSize = size"
              :variant="selectedSize === size ? 'solid' : 'outline'"
              class="w-12 text-center"
              square
              :ui="{
                label: 'w-full text-sm text-center',
              }"
            >
              {{ size }}
            </UButton>
          </div>
        </div>

        <p
          class="text-md text-primary border-b-default border-b pb-4 font-bold md:text-lg 2xl:text-xl"
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

const availableColors = ref(['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF'])
const availableSizes = ref(['S', 'M', 'L', 'XL', 'XXL'])

const selectedSize = ref<string>('')
const selectedColor = ref<string>('')

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
