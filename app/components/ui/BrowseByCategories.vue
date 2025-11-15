<template>
  <UCollapsible class="sticky top-20 flex w-full flex-col gap-2" default-open>
    <UButton
      class="group"
      label="Browse by Categories"
      color="neutral"
      variant="link"
      trailing-icon="i-lucide-chevron-down"
      :ui="{
        base: 'p-0',
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
      }"
      block
    />

    <template #content>
      <div class="mt-4 flex flex-col space-y-6">
        <template v-if="isLoading">
          <USkeleton v-for="i in 10" :key="i" class="h-4 w-full rounded" />
        </template>
        <ULink
          v-else
          class="line-clamp-1"
          v-for="category in categoryStore.categories"
          :to="`/categories/${category.slug}`"
          :key="category._id"
          viewTransition
        >
          {{ category.name }}
        </ULink>
      </div>
    </template>
  </UCollapsible>
</template>

<script setup lang="ts">
const categoryStore = useCategoryStore()
const isLoading = ref(true)

onMounted(async () => {
  if (!categoryStore.categories?.length) {
    await categoryStore.fetchCategories()
  }
  isLoading.value = false
})
</script>
