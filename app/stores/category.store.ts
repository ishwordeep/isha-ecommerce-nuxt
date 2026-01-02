import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CategoryResponse } from '~/services/category.service'
import CategoryService from '~/services/category.service'

export const useCategoryStore = defineStore('category', () => {
  const isLoading = ref(false)
  const categories = ref<CategoryResponse[] | null>(null)
  const selectedCategory = ref<CategoryResponse | null>(null)
  const fetchCategories = async () => {
    isLoading.value = true
    try {
      // Simulate API call
      const response = await CategoryService.fetchCategories()
      if (response.data?.success) {
        categories.value = response.data.data
      }
    } catch (error) {
      console.log('Error', error)
      // Handle error if needed
    } finally {
      isLoading.value = false
    }
  }

  const setSelectedCategory = (category: CategoryResponse) => {
    selectedCategory.value = category
  }

  const fetchCategoryById = async (id: string) => {
    let category
    console.log(categories.value)
    if (categories.value) {
      category = categories.value.find((cat) => cat.slug === id || cat._id === id) || null
      if (!category) {
        category = await CategoryService.fetchCategoryById(id).then((res) =>
          res.data?.success ? res.data.data : null
        )
      } else {
        console.log('Found category in store')
      }
    } else {
      category = await CategoryService.fetchCategoryById(id).then((res) =>
        res.data?.success ? res.data.data : null
      )
    }
    console.log(category)
    setSelectedCategory(category as CategoryResponse)
    return category
  }

  return {
    isLoading,
    fetchCategories,
    categories,
    selectedCategory,
    setSelectedCategory,
    fetchCategoryById,
  }
})
