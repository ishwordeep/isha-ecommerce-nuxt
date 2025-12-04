import AxiosService from './axios.service'
import type { ItemResponse, RootServiceInterface } from './index.service'

export interface CartResponse {
  _id: string
  userId: string
  createdAt: string
  updatedAt: string
  items: Item[]
}
export interface Item {
  productId: string
  quantity: number
  color: string
  size: string
  name: string
  image: string
  price: number
  discount: number
  _id: string
}

class CartService {
  async fetchCartItems(): Promise<RootServiceInterface<ItemResponse<CartResponse>>> {
    const url = `/cart`
    return await AxiosService.get<ItemResponse<CartResponse>>(url)
  }

  async addToCart(payload: CartPayload): Promise<RootServiceInterface<ItemResponse<Item>>> {
    const url = `/cart`
    return await AxiosService.post<ItemResponse<Item>>(url, payload)
  }

  async updateCart(
    itemId: string,
    payload: Partial<CartPayload>
  ): Promise<RootServiceInterface<ItemResponse<Item>>> {
    const url = `/cart/${itemId}`
    return await AxiosService.patch<ItemResponse<Item>>(url, payload)
  }

  async removeFromCart(itemId: string): Promise<RootServiceInterface<ItemResponse<CartResponse>>> {
    const url = `/cart/${itemId}`
    return await AxiosService.delete<ItemResponse<CartResponse>>(url)
  }
}

export default new CartService()
