import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CategoryResponse } from '~/services/category.service'

const categoryData: CategoryResponse[] = [
  {
    _id: '1',
    name: "Men's Clothing",
    image: '👔',
    itemCount: 245,
    bgColor: 'from-blue-400 to-blue-600',
  },
  {
    _id: '2',
    name: "Women's Clothing",
    image: '👗',
    itemCount: 389,
    bgColor: 'from-pink-400 to-pink-600',
  },
  {
    _id: '3',
    name: 'Footwear',
    image: '👟',
    itemCount: 156,
    bgColor: 'from-purple-400 to-purple-600',
  },
  {
    _id: '4',
    name: 'Accessories',
    image: '👜',
    itemCount: 198,
    bgColor: 'from-amber-400 to-amber-600',
  },
  {
    _id: '5',
    name: 'Activewear',
    image: '🏃',
    itemCount: 127,
    bgColor: 'from-green-400 to-green-600',
  },
  {
    _id: '6',
    name: 'Outerwear',
    image: '🧥',
    itemCount: 92,
    bgColor: 'from-slate-400 to-slate-600',
  },
]
export const useCategoryStore = defineStore('category', () => {
  const isLoading = ref(false)
  const categories = ref<CategoryResponse[] | null>(null)
  const fetchCategories = async () => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 5000))
      categories.value = categoryData
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
