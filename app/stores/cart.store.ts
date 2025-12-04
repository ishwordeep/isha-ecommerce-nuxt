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
      console.log(response.data?.data)
      if (response.data?.success) {
        const itemResponse = response.data?.data
        const existingItem = carts.value?.find((item) => item._id === itemResponse?._id)
        if (existingItem) {
          existingItem.quantity += payload?.quantity || 0
          cartTotal.value += (itemResponse?.price || 0) * (payload?.quantity || 0)
        } else {
          carts.value = carts.value
            ? [...carts.value, itemResponse as Item]
            : [itemResponse as Item]
          cartTotal.value += (itemResponse?.price || 0) * (payload?.quantity || 0)
        }
        return response
      }
    } catch (error) {
      console.log('Error', error)
      // Handle error if needed
    } finally {
      isLoading.value = false
    }
  }

  const updateCart = async (itemId: string, payload: Partial<CartPayload>) => {
    const existingItemIndex = carts.value?.findIndex((item) => item._id === itemId)

    if (existingItemIndex === -1 || existingItemIndex === undefined) {
      return
    }

    const existingItem = carts.value![existingItemIndex]

    isLoading.value = true
    try {
      const response = await CartService.updateCart(itemId, payload)

      if (response.data?.success) {
        const updatedItem = response.data.data // the fresh item from the server

        cartTotal.value -= (existingItem?.price || 0) * (existingItem?.quantity || 0)

        cartTotal.value += (updatedItem?.price || 0) * (updatedItem?.quantity || 0)

        carts.value![existingItemIndex] = updatedItem as Item

        return response
      }
    } catch (error) {
      console.error('Error updating cart item:', error)
      // Optionally show a toast/notification here
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
            (total: number, item: Partial<Item>) =>
              total + (item.price || 0) * (item.quantity || 0),
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
    updateCart,
  }
})
