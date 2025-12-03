import type { Address } from 'cluster'
import AxiosService from './axios.service'
import type { ItemResponse, RootServiceInterface } from './index.service'

export interface Item {
  productId: string
  name: string
  price: number
  quantity: number
  size: string
  color: string
  image: string
}

export interface OrderResponse {
  orderNumber: string
  items: Item[]
  subtotal: number
  discountTotal: number
  shippingFee: number
  grandTotal: number
  shippingAddress: Address
  status: string
  paymentMethod: string
  paymentStatus: string
  notes: string
  isDeleted: boolean
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

class OrderService {
  async saveOrder(
    orderData: CheckoutForm
  ): Promise<RootServiceInterface<ItemResponse<OrderResponse>>> {
    return await AxiosService.post('/order', orderData)
  }
}

export default new OrderService()
