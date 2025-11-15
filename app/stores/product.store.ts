import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PaginationInterface, QueryInterface } from '~/services/index.service'
import ProductService, { type ProductResponse } from '~/services/product.service'
type ProductFlag = 'new' | 'trending' | 'featured'

interface FlagCollections {
  new: ProductResponse[]
  trending: ProductResponse[]
  featured: ProductResponse[]
}

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

  const flagCollections = ref<FlagCollections>({
    new: [],
    trending: [],
    featured: [],
  })

  const fetchProducts = async ({
    page = 1,
    limit = 12,
    search = '',
    sort = '',
  }: QueryInterface) => {
    isLoading.value = true
    try {
      const response = await ProductService.fetchProducts({ page, limit, search, sort })
      if (response.data?.success) {
        products.value = response.data?.data || null
        pagination.value = response.data?.pagination || null
      }
    } catch (error) {
      console.error('Error fetching products', error)
    } finally {
      isLoading.value = false
    }
  }

  const loadMoreProducts = async ({
    page = 1,
    limit = 12,
    search = '',
    sort = '',
  }: QueryInterface) => {
    isLoading.value = true
    try {
      const response = await ProductService.fetchProducts({ page, limit, search, sort })
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

  const fetchProductsByFlags = async (flag: ProductFlag) => {
    const validFlags: ProductFlag[] = ['new', 'trending', 'featured']
    if (!validFlags.includes(flag)) {
      console.error('Invalid flag provided:', flag)
      return
    }

    isLoading.value = true
    try {
      const response = await ProductService.getProductsByFlag(flag)
      if (response.data?.success) {
        flagCollections.value[flag] = response.data.data || []
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
        categoryProducts.value = response.data?.data || null
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
