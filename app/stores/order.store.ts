import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { OrderResponse } from '~/services/order.service'

const orderData = [
  {
    _id: 'ORD-123456',
    date: '2025-11-05',
    status: 'Delivered',
    total: 284.99,
    items: 3,
    products: [
      { name: 'Denim Jacket', image: '🧥', color: 'Blue', size: 'M', qty: 1, price: 89.99 },
      { name: 'White Sneakers', image: '👟', color: 'White', size: '10', qty: 2, price: 65.0 },
    ],
  },
  {
    _id: 'ORD-123455',
    date: '2025-10-28',
    status: 'Shipped',
    total: 120.0,
    items: 1,
    products: [
      { name: 'Black Dress', image: '👗', color: 'Black', size: 'M', qty: 1, price: 120.0 },
    ],
  },
  {
    _id: 'ORD-123454',
    date: '2025-10-15',
    status: 'Processing',
    total: 179.98,
    items: 2,
    products: [
      { name: 'Cotton T-Shirt', image: '👕', color: 'White', size: 'L', qty: 2, price: 29.99 },
      { name: 'Leather Bag', image: '👜', color: 'Brown', size: 'One Size', qty: 1, price: 150.0 },
    ],
  },
]

export const useOrderStore = defineStore('order', () => {
  const isLoading = ref(false)
  const selectedOrder = ref<OrderResponse | null>(null)
  const orders = ref<OrderResponse[] | null>(null)
  const fetchOrders = async () => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      orders.value = orderData
    } finally {
      isLoading.value = false
    }
  }

  const fetchOrderById = async () => {
    isLoading.value = true
    try {
      const data = orderData[0]
      await new Promise((resolve) => setTimeout(resolve, 1000))
      selectedOrder.value = data || null
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    selectedOrder,
    fetchOrders,
    fetchOrderById,
    orders,
  }
})
