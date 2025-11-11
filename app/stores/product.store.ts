import { defineStore } from 'pinia'
import { ref } from 'vue'
import ProductService, { type ProductResponse } from '~/services/product.service'
import type { PaginationInterface, QueryInterface } from '~/services/index.service'

export const useProductStore = defineStore('product', () => {
  const isLoading = ref(false)
  const selectedProduct = ref<ProductResponse | null>(null)
  const newArrivals = ref<ProductResponse[] | null>(null)
  const trending = ref<ProductResponse[] | null>(null)
  const featured = ref<ProductResponse[] | null>(null)
  const products = ref<ProductResponse[] | null>(null)
  const categoryProducts = ref<ProductResponse[] | null>(null)
  const currentCategory = ref<string | null>(null)
  const pagination = ref<PaginationInterface | null>(null)

  const flagCollections = ref({
    new: [] as ProductResponse[],
    featured: [] as ProductResponse[],
    trending: [] as ProductResponse[],
  })

  const fetchProducts = async ({ page = 1, limit = 12, search = '' }: QueryInterface) => {
    isLoading.value = true
    try {
      const response = await ProductService.fetchProducts({ page, limit, search })
      if (response.data?.success) {
        products.value = response.data?.data || null
      }
    } catch (error) {
      console.error('Error fetching products', error)
    } finally {
      isLoading.value = false
    }
  }

  const loadMoreProducts = async ({ page = 1, limit = 12, search = '' }: QueryInterface) => {
    isLoading.value = true
    try {
      const response = await ProductService.fetchProducts({ page, limit, search })
      if (response.data?.success) {
        if (products.value) {
          products.value = products.value.concat(response.data?.data || [])
          pagination.value = response.data?.pagination || null
        } else {
          products.value = response.data?.data || null
        }
      }
    } catch (error) {
      console.error('Error loading more products', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchProductsByFlags = async (flag: string) => {
    if (flag! in ['newArrivals', 'trending', 'featured']) {
      console.error('Invalid flag provided:', flag)
      return
    }
    isLoading.value = true
    try {
      // Simulate API call
      const response = await ProductService.getProductsByFlag(flag)
      if (response.data?.success) {
        console.log('Fetched products for flag:', flag, response.data?.data?.data)
        flagCollections.value[flag] = response.data.data?.data
      } else {
        flagCollections.value[flag] = []
      }
    } catch (error) {
      console.error('Error fetching products by flags:', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchProductById = async (id: string) => {
    isLoading.value = true
    try {
      const response = await ProductService.getProduct(id)
      if (response.data?.success) {
        selectedProduct.value = response.data?.data || null
      }
    } catch (error) {
      console.error('Error fetching products by flags:', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchProductsByCategory = async (categoryId: string) => {
    isLoading.value = true
    try {
      const response = await ProductService.getProductsByCategory(categoryId, '')
      if (response.data?.success) {
        categoryProducts.value = response.data?.data?.data || null
        currentCategory.value = categoryProducts.value?.[0]?.categoryDetails?.name || null
        return
      }
    } catch (error) {
      console.error('Error fetching products by flags:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    selectedProduct,
    fetchProducts,
    fetchProductById,
    products,
    fetchProductsByFlags,
    newArrivals,
    trending,
    featured,
    fetchProductsByCategory,
    categoryProducts,
    currentCategory,
    loadMoreProducts,
    pagination,
    flagCollections,
  }
})
