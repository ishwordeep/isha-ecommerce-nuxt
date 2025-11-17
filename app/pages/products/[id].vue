<script setup lang="ts">
import Login from '~/components/auth/login.vue'
import { useProductSeo } from '~/composables/useProductSchema'
import ProductImages from '~/pages/products/components/ProductImages.vue'
import type { ProductResponse } from '~/services/product.service'
import Faqs from './components/Faqs.vue'

const quantity = ref(1)

const productStore = useProductStore()

const availableColors = computed(() => {
  return productStore.selectedProduct?.colors || []
})
const availableSizes = computed(() => {
  return productStore.selectedProduct?.sizes || []
})

const category = computed(() => {
  return {
    label: productStore.selectedProduct?.categoryDetails?.name || 'Category',
    to: `/categories/${productStore.selectedProduct?.categoryDetails?._id || ''}`,
  }
})

const selectedSize = ref<string>(unref(availableSizes.value[0] || ''))
const selectedColor = ref<string>(unref(availableColors.value[0] || ''))
const openLoginModal = ref(false)
const authStore = useAuthStore()
const toast = useToast()
const route = useRoute()

const breadcrumbs = computed(() => [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: category.value.label,
    to: category.value.to,
  },
  {
    label: productStore.selectedProduct?.name || 'Product',
    to: `/products/${productStore.selectedProduct?._id || ''}`,
  },
])
const { id } = route.params

await useAsyncData(`product-${id}`, () => productStore.fetchProductById(id as string))

// This is now 100% type-safe
useProductSeo(computed(() => productStore.selectedProduct))

const { addToCart } = useAddToCart()

const handleAddToCart = () => {
  const product = productStore.selectedProduct as ProductResponse
  if (!authStore.isAuthenticated) {
    toast.add({
      color: 'warning',
      title: 'Login Required',
      description: 'Please log in to add items to your cart.',
    })
    openLoginModal.value = true
    return
  }
  addToCart({
    product: product,
    quantity: quantity.value,
    selectedColor: selectedColor.value,
    selectedSize: selectedSize.value,
  })
}
</script>

<template>
  <div>
    <UBreadcrumb :items="breadcrumbs" />
    <hr class="my-4 border-gray-300" />
    <Login :showTrigger="false" v-model:open="openLoginModal" />
    <div class="grid grid-cols-1 gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:gap-8">
      <!--Images-->
      <ProductImages />

      <div class="flex flex-col space-y-4">
        <h3 class="text-xl font-bold text-black md:text-2xl 2xl:text-3xl">
          {{ productStore.selectedProduct?.name }}
        </h3>
        <p class="border-b-default border-b pb-4 text-sm md:text-base 2xl:text-lg">
          Category
          <ULink
            :to="`/categories/${productStore.selectedProduct?.categoryDetails?._id || ''}`"
            class="text-blue-500"
            viewTransition
          >
            {{ productStore.selectedProduct?.categoryDetails?.name || '' }}
          </ULink>
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
              class="min-w-12 justify-center text-center"
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
          ${{ productStore.selectedProduct?.price || '' }} &nbsp;
          <!-- <span class="text-secondary line-through">Rs. 4000</span> -->
        </p>

        <UFormField name="quantity" label="Quantity">
          <UInputNumber v-model="quantity" :min="1" class="max-w-32" />
        </UFormField>

        <div class="flex space-x-2">
          <UButton label="Add To Cart" class="max-w-32 justify-center" @click="handleAddToCart" />
          <UButton icon="i-lucide-heart" variant="outline" />
          <UButton icon="i-lucide-share-2" variant="outline" />
        </div>

        <UBadge
          v-if="productStore.selectedProduct?.discount ?? 0 > 0"
          color="error"
          class="max-w-max"
          variant="soft"
          size="xl"
        >
          - {{ productStore.selectedProduct?.discount || 0 }}%
        </UBadge>
      </div>
    </div>

    <Faqs />
  </div>
</template>
