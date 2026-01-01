import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PaginationInterface, QueryInterface } from '~/services/index.service'
import type { OrderResponse } from '~/services/order.service'
import OrderService from '~/services/order.service'

export const useOrderStore = defineStore('order', () => {
  const isLoading = ref(false)
  const selectedOrder = ref<OrderResponse | null>(null)
  const orders = ref<OrderResponse[] | null>(null)
  const orderFailed = ref(false)
  const pagination = ref<PaginationInterface | null>(null)

  const initialState = () => ({
    isLoading: false,
    selectedOrder: null as OrderResponse | null,
    orders: null as OrderResponse[] | null,
    orderFailed: false,
  })

  const reset = () => {
    // Reset all reactive state to initial values
    isLoading.value = initialState().isLoading
    selectedOrder.value = initialState().selectedOrder
    orders.value = initialState().orders
    orderFailed.value = initialState().orderFailed
  }

  const fetchOrders = async ({
    page = 1,
    limit = 10,
    search = '',
    status = '',
  }: QueryInterface) => {
    isLoading.value = true
    try {
      const response = await OrderService.fetchOrders({ page, limit, search, status })
      if (response.data?.success) {
        orders.value = response.data?.data as OrderResponse[]
        // pagination.value = response.data?.pagination || null
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      isLoading.value = false
    }
  }

  const saveOrder = async (orderData: CheckoutForm) => {
    isLoading.value = true
    try {
      const response = await OrderService.saveOrder(orderData)
      if (response.data?.success) {
        orders.value = [...(orders.value || []), response.data.data as OrderResponse]
        selectedOrder.value = response.data?.data
      }
    } catch (error) {
      console.error('Error saving order:', error)
      orderFailed.value = true
    } finally {
      isLoading.value = false
    }
  }

  const fetchOrderById = async (orderId: string) => {
    isLoading.value = true
    try {
      const response = await OrderService.fetchOrderById(orderId)
      if (response.data?.success) {
        selectedOrder.value = response.data?.data as OrderResponse
        return response
      }
    } catch (error) {
      console.error('Error fetching order by ID:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    selectedOrder,
    pagination,
    saveOrder,
    orders,
    orderFailed,
    fetchOrders,
    reset,
    fetchOrderById,
  }
})
