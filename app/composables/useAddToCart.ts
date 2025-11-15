import { useToast } from '#imports' // or your toast import path
import type { Item } from '~/services/cart.service'
import type { ProductResponse } from '~/services/product.service'
import { useCartStore } from '~/stores/cart.store'

interface AddToCartOptions {
  product: ProductResponse
  selectedColor?: string
  selectedSize?: string
  quantity?: number
  canAddToCart?: boolean
}

export const useAddToCart = () => {
  const cartStore = useCartStore()
  const toast = useToast()

  const addToCart = async ({
    product,
    selectedColor,
    selectedSize,
    quantity = 1,
    canAddToCart = true,
  }: AddToCartOptions) => {
    if (!canAddToCart) return

    const payload = {
      productId: product._id,
      color: selectedColor || product.colors?.[0] || '',
      size: selectedSize || product.sizes?.[0] || '',
      quantity,
    }

    const response = await cartStore.addToCart(payload)

    if (response?.data?.success) {
      // Check if product already exists in cart
      const existingItem = cartStore.carts?.find(
        (item: Item) =>
          item.productId === payload.productId &&
          item.color === payload.color &&
          item.size === payload.size
      )

      if (existingItem) {
        existingItem.quantity += payload.quantity
        cartStore.cartTotal += product.price * payload.quantity
        existingItem.price = quantity * product.price
      } else {
        cartStore.carts?.push({
          ...payload,
          image: product.image || '',
          name: product.name,
          price: product.price,
          discount: product.discount || 0,
        })
      }

      toast.add({
        color: 'success',
        title: 'Added to Cart',
        description: `${product.name} has been added to your cart.`,
        duration: 4000,
      })
    } else {
      toast.add({
        color: 'error',
        title: 'Error',
        description: `Failed to add ${product.name} to your cart.`,
        duration: 4000,
      })
    }
  }

  return { addToCart }
}
