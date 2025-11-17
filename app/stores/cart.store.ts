import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Item } from '~/services/cart.service'
import CartService from '~/services/cart.service'

export interface CartPayload {
  productId: string
  quantity: number
  color?: string
  size?: string
}

export const useCartStore = defineStore('cart', () => {
  const isLoading = ref(false)
  const carts = ref<Item[] | null>(null)
  const cartTotal = ref<number>(0)
  const fetchCarts = async () => {
    isLoading.value = true
    try {
      // Simulate API call
      const response = await CartService.fetchCartItems()
      if (response.data?.success) {
        console.log(response.data?.data)
        carts.value = response.data.data?.items as Item[]
        cartTotal.value =
          response.data.data?.items.reduce(
            (total: number, item: Item) => total + item.price * item.quantity,
            0
          ) || 0
      }
    } catch (error) {
      console.log('Error', error)
      // Handle error if needed
    } finally {
      isLoading.value = false
    }
  }

  const addToCart = async (payload: CartPayload) => {
    isLoading.value = true
    try {
      const response = await CartService.addToCart(payload)
      return response
    } catch (error) {
      console.log('Error', error)
      // Handle error if needed
    } finally {
      isLoading.value = false
    }
  }

  const removeFromCart = async (itemId: string) => {
    isLoading.value = true
    try {
      const response = await CartService.removeFromCart(itemId)
      if (response.data?.success) {
        carts.value = carts.value?.filter((item) => item._id !== itemId) || null
        cartTotal.value =
          carts.value?.reduce(
            (total: number, item: Item) => total + item.price * item.quantity,
            0
          ) || 0
      }
      return response
    } catch (error) {
      console.log('Error', error)
      // Handle error if needed
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    fetchCarts,
    carts,
    addToCart,
    cartTotal,
    removeFromCart,
  }
})
