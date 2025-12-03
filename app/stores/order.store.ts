import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { OrderResponse } from '~/services/order.service'
import OrderService from '~/services/order.service'

export const useOrderStore = defineStore('order', () => {
  const isLoading = ref(false)
  const selectedOrder = ref<OrderResponse | null>(null)
  const orders = ref<OrderResponse[] | null>(null)

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
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    selectedOrder,
    saveOrder,
    orders,
  }
})
