<template>
  <div class="py-8">
    <!-- Hero Section -->
    <SectionHero :section="section" />
    <!-- Categories Grid -->
    <div
      class="mt-8 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:gap-6"
    >
      <template v-if="isLoading">
        <USkeleton v-for="i in 6" :key="i" class="h-48 w-full rounded-2xl" />
      </template>
      <div
        v-else
        v-for="category in categoryStore.categories?.slice(0, 6)"
        :key="category._id"
        class="group cursor-pointer"
      >
        <!-- Square Image Container -->
        <div
          class="relative mb-4 aspect-square overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl"
          @click="navigateTo(`/categories/${category.slug}`)"
        >
          <!-- Background Gradient -->
          <div
            :class="[
              'absolute inset-0 bg-linear-to-br transition-transform duration-500 group-hover:scale-105',
            ]"
          />

          <!-- Decorative Pattern Overlay -->
          <div class="absolute inset-0 opacity-10">
            <div
              class="absolute inset-0"
              :style="{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }"
            />
          </div>

          <!-- Category Image/Icon -->
          <div class="absolute inset-0 flex items-center justify-center">
            <NuxtImg
              v-if="category.image"
              :src="category.image"
              alt="Category Image"
              class="h-full w-full object-contain transition-all duration-300 group-hover:scale-125 group-hover:rotate-6"
            />
            <div v-else class="h-full w-full bg-gray-200" />
          </div>

          <!-- Item Count Badge -->
          <div class="absolute top-4 right-4">
            <span
              class="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-900 shadow-md backdrop-blur-sm"
            >
              {{ category.productCount }} items
            </span>
          </div>

          <!-- Hover Overlay -->
          <div
            :class="[
              'absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100',
            ]"
          >
            <div
              class="flex h-12 w-12 transform items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300"
            >
              <UIcon name="i-lucide-arrow-right" class="h-6 w-6 text-gray-900" />
            </div>
          </div>
        </div>

        <!-- Category Name -->
        <div class="text-center">
          <h3
            :class="[
              'line-clamp-1 text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600',
            ]"
          >
            {{ category.name }}
          </h3>
        </div>
      </div>
    </div>

    <!-- View All Categories Button -->
    <div class="mt-12 text-center">
      <UButton
        size="xl"
        color="neutral"
        class="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-bold transition-all duration-300 hover:scale-105"
        to="/categories"
        viewTransition
      >
        Browse All Categories
        <UIcon name="i-lucide-arrow-right" class="h-5 w-5" />
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import SectionHero from '~/components/ui/SectionHero.vue'

const isLoading = ref(true)
const categoryStore = useCategoryStore()
const section = ref({
  title: 'Shop By Categories',
  description: `Explore our diverse range of fashion categories. From everyday essentials to statement pieces, find exactly what you\'re looking for.`,
})
onMounted(async () => {
  if (!categoryStore.categories?.length) {
    await categoryStore.fetchCategories()
  }
  isLoading.value = false
})
</script>
