import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PaginationInterface, QueryInterface, StatusCount } from '~/services/index.service'
import type { OrderResponse, PaymentIntent } from '~/services/order.service'
import OrderService from '~/services/order.service'

export const useOrderStore = defineStore('order', () => {
  const isLoading = ref(false)
  const selectedOrder = ref<OrderResponse | null>(null)
  const orders = ref<OrderResponse[] | null>(null)
  const orderFailed = ref(false)
  const pagination = ref<PaginationInterface | null>(null)
  const paymentIntent = ref<PaymentIntent | null>(null)
  const statusCounts = ref<StatusCount | null>(null)
  const orderTotals = ref({
    subtotal: 0,
    shipping: 0,
    total: 0,
  })

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
        pagination.value = response.data?.pagination || null
        statusCounts.value = response.data?.statusCounts || null
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

  const initiatePayment = async () => {
    if (!selectedOrder.value?._id) {
      console.error('No selected order to pay for.')
      isLoading.value = false
      return null
    }
    isLoading.value = true
    try {
      const response = await OrderService.initiatePayment(selectedOrder.value?._id || '')
      if (response.data?.success) {
        paymentIntent.value = response.data?.data as PaymentIntent
        return response.data?.data
      }
    } catch (error) {
      console.error('Error initiating payment:', error)
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
    orderTotals,
    initiatePayment,
    paymentIntent,
    statusCounts,
  }
})
