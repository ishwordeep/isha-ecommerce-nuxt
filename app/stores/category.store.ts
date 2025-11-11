import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CategoryResponse } from '~/services/category.service'
import CategoryService from '~/services/category.service'

export const useCategoryStore = defineStore('category', () => {
  const isLoading = ref(false)
  const categories = ref<CategoryResponse[] | null>(null)
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

  return {
    isLoading,
    fetchCategories,
    categories,
  }
})
