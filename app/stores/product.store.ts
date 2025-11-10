import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '~/services/product.service'

const productData = [
  {
    _id: '1',
    name: 'Denim Jacket',
    image: '🧥',
    colors: ['#0000FF', '#00FF00', '#FF0000'], // Blue, Green, Red
    sizes: ['S', 'M', 'L'],
    size: 'M',
    qty: 1,
    price: 89.99,
    category: { _id: '1', name: 'Jackets' },
  },
  {
    _id: '2',
    name: 'Running Shoes',
    image: '👟',
    colors: ['#FF0000', '#000000', '#FFFFFF'], // Red, Black, White
    sizes: ['8', '9', '10', '11'],
    size: '9',
    qty: 1,
    price: 120.0,
    category: { _id: '2', name: 'Shoes' },
  },
  {
    _id: '3',
    name: 'Summer Dress',
    image: '👗',
    colors: ['#FFFF00', '#0000FF', '#FFC0CB'], // Yellow, Blue, Pink
    sizes: ['XS', 'S', 'M', 'L'],
    size: 'S',
    qty: 3,
    price: 75.5,
    category: { _id: '3', name: 'Dresses' },
  },
  {
    _id: '4',
    name: 'Jeans',
    image: '👖',
    colors: ['#000000', '#000080', '#808080'], // Black, Navy, Gray
    sizes: ['30', '32', '34', '36'],
    size: '32',
    qty: 2,
    price: 60.0,
    category: { _id: '4', name: 'Pants' },
  },
  {
    _id: '5',
    name: 'Hoodie',
    image: '👕',
    colors: ['#808080', '#000000', '#000080'], // Gray, Black, Navy
    sizes: ['S', 'M', 'L', 'XL'],
    size: 'L',
    qty: 1,
    price: 50.0,
    category: { _id: '5', name: 'Sweatshirts' },
  },
  {
    _id: '6',
    name: 'Leather Jacket',
    image: '🧥',
    colors: ['#000000', '#8B4513'], // Black, SaddleBrown
    sizes: ['M', 'L', 'XL'],
    size: 'L',
    qty: 1,
    price: 200.0,
    category: { _id: '1', name: 'Jackets' },
  },
  {
    _id: '7',
    name: 'Chinos',
    image: '👖',
    colors: ['#F5F5DC', '#BDB76B', '#000080'], // Beige, DarkKhaki, Navy
    sizes: ['32', '34', '36', '38'],
    size: '34',
    qty: 2,
    price: 70.0,
    category: { _id: '4', name: 'Pants' },
  },
  {
    _id: '8',
    name: 'Graphic T-Shirt',
    image: '👕',
    colors: ['#FFFFFF', '#000000', '#FF0000', '#0000FF'], // White, Black, Red, Blue
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    size: 'M',
    qty: 4,
    price: 25.0,
    category: { _id: '6', name: 'T-Shirts' },
  },
  {
    _id: '9',
    name: 'Ankle Boots',
    image: '👢',
    colors: ['#8B4513', '#000000'], // Brown, Black
    sizes: ['7', '8', '9', '10'],
    size: '8',
    qty: 1,
    price: 130.0,
    category: { _id: '2', name: 'Shoes' },
  },
  {
    _id: '10',
    name: 'Floral Skirt',
    image: '👗',
    colors: ['#FFC0CB', '#0000FF', '#008000'], // Pink, Blue, Green
    sizes: ['XS', 'S', 'M', 'L'],
    size: 'S',
    qty: 2,
    price: 55.0,
    category: { _id: '7', name: 'Skirts' },
  },
]

export const useProductStore = defineStore('product', () => {
  const isLoading = ref(false)
  const selectedProduct = ref<Product | null>(null)
  const newArrivals = ref<Product[] | null>(null)
  const trending = ref<Product[] | null>(null)
  const featured = ref<Product[] | null>(null)
  const products = ref<Product[] | null>(null)
  const categoryProducts = ref<Product[] | null>(null)
  const currentCategory = ref<string | null>(null)
  const fetchProducts = async () => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      products.value = productData
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
      await new Promise((resolve) => setTimeout(resolve, 5000))
      if (flag === 'newArrivals') {
        newArrivals.value = productData.slice(0, 4) // Example: first 4 products as new arrivals
      }
      if (flag === 'trending') {
        trending.value = productData.slice(2, 6) // Example: last 4 products as trending
      }
      if (flag === 'featured') {
        featured.value = productData.slice(1, 5) // Example: middle 4 products as featured
      }
    } catch (error) {
      console.error('Error fetching products by flags:', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchProductById = async () => {
    isLoading.value = true
    try {
      const data = productData[0]
      await new Promise((resolve) => setTimeout(resolve, 1000))
      selectedProduct.value = data || null
    } catch (error) {
      console.error('Error fetching products by flags:', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchProductsByCategory = async (categoryId: string) => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      categoryProducts.value = productData.filter((product) => product.category._id === categoryId)
      currentCategory.value = categoryProducts.value?.[0]?.category?.name || null
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
  }
})
