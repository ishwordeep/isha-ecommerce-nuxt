import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { Address } from '~/services/auth.service'
import OrderService, { type OrderResponse } from '~/services/order.service'
import type { ProductResponse } from '~/services/product.service'

export interface CheckoutForm {
  name: string
  email: string
  phone: string
  items: Partial<ProductResponse>[]
  subtotal: number
  discountTotal: number
  shippingFee: number
  grandTotal: number
  shippingAddress: Partial<Address>
  paymentMethod: string
  notes: string
}

const emptyForm = (): CheckoutForm => ({
  name: '',
  email: '',
  phone: '',
  items: [],
  subtotal: 0,
  discountTotal: 0,
  shippingFee: 0,
  grandTotal: 0,
  shippingAddress: {
    apartment: '',
    _id: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  },
  paymentMethod: '',
  notes: '',
})

export const useCheckoutStore = defineStore('checkout', () => {
  const isLoading = ref(false)
  const formInputs = reactive<CheckoutForm>(emptyForm())
  const orderStore = useOrderStore()

  const saveOrder = async (orderData: CheckoutForm) => {
    isLoading.value = true
    try {
      const response = await OrderService.saveOrder(orderData)
      if (response.data?.success) {
        orderStore.orders = [...(orderStore.orders || []), response.data.data as OrderResponse]
        orderStore.selectedOrder = response.data?.data
      }
      return response
    } catch (error) {
      console.error('Error saving order:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    formInputs,
    saveOrder,
  }
})
