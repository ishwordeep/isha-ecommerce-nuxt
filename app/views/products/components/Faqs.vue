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

  <div class="mt-12 flex flex-col items-center justify-center gap-4 text-center text-black">
    <h4 class="text-xl font-semibold md:text-3xl xl:text-4xl">Frequently Asked Questions</h4>
    <UAccordion
      :items="items"
      class="w-full max-w-4xl space-y-4"
      :ui="{
        label: 'text-left text-lg md:text-xl xl:text-2xl font-medium',
        body: 'text-gray-600 text-base md:text-md xl:text-lg text-left px-2',
        item: 'border border-gray-400   last:border-b',
        header: 'hover:bg-gray-100 px-2',
      }"
      v-if="items.length"
    />

    <div v-else class="text-gray-500">No FAQs available for this product.</div>
  </div>
</template>
