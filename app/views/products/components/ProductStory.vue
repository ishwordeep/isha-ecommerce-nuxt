<script setup lang="ts">
const productStore = useProductStore()

const items = computed(
  () =>
    productStore.selectedProduct?.faqs?.map((faq) => ({
      label: faq.question,
      content: faq.answer,
    })) || []
)
</script>

<template>
  <!--Images-->

  <div class="mt-12 flex flex-col justify-center gap-4 text-black">
    <h4 class="text-center text-xl font-semibold md:text-3xl xl:text-4xl">
      Story Behind {{ productStore.selectedProduct?.name }}
    </h4>
    <div v-html="productStore.selectedProduct?.story" class="raw-html" />
  </div>
</template>
