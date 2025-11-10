import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '~/services/product.service'

type flags = 'newArrivals' | 'trending' | 'featured'

const productData = [
  {
    name: 'Denim Jacket',
    image: '🧥',
    color: 'Blue',
    size: 'M',
    qty: 1,
    price: 89.99,
    category: { name: 'Jackets' },
  },
  {
    name: 'Running Shoes',
    image: '👟',
    color: 'Red',
    size: '9',
    qty: 1,
    price: 120.0,
    category: { name: 'Shoes' },
  },
  {
    name: 'Summer Dress',
    image: '👗',
    color: 'Yellow',
    size: 'S',
    qty: 3,
    price: 75.5,
    category: { name: 'Dresses' },
  },
  {
    name: 'Jeans',
    image: '👖',
    color: 'Black',
    size: '32',
    qty: 2,
    price: 60.0,
    category: { name: 'Pants' },
  },
  {
    name: 'Hoodie',
    image: '👕',
    color: 'Gray',
    size: 'L',
    qty: 1,
    price: 50.0,
    category: { name: 'Sweatshirts' },
  },
  {
    name: 'Leather Jacket',
    image: '🧥',
    color: 'Black',
    size: 'L',
    qty: 1,
    price: 200.0,
    category: { name: 'Jackets' },
  },
  {
    name: 'Chinos',
    image: '👖',
    color: 'Beige',
    size: '34',
    qty: 2,
    price: 70.0,
    category: { name: 'Pants' },
  },
  {
    name: 'Graphic T-Shirt',
    image: '👕',
    color: 'White',
    size: 'M',
    qty: 4,
    price: 25.0,
    category: { name: 'T-Shirts' },
  },
  {
    name: 'Ankle Boots',
    image: '👢',
    color: 'Brown',
    size: '8',
    qty: 1,
    price: 130.0,
    category: { name: 'Shoes' },
  },
  {
    name: 'Floral Skirt',
    image: '👗',
    color: 'Pink',
    size: 'S',
    qty: 2,
    price: 55.0,
    category: { name: 'Skirts' },
  },
]

export const useProductStore = defineStore('product', () => {
  const isLoading = ref(false)
  const selectedProduct = ref<Product | null>(null)
  const newArrivals = ref<Product[] | null>(null)
  const trending = ref<Product[] | null>(null)
  const featured = ref<Product[] | null>(null)
  const products = ref<Product[] | null>(null)
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

  const fetchProductsByFlags = async (flag: flags) => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 5000))
      if (flag === 'newArrivals') {
        newArrivals.value = productData.slice(0, 4) // Example: first 3 products as new arrivals
      }
      if (flag === 'trending') {
        trending.value = productData.slice(2, 6) // Example: last 3 products as trending
      }
      if (flag === 'featured') {
        featured.value = productData.slice(1, 5) // Example: middle 3 products as featured
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
  }
})
