import type { Address } from './auth.service'
import AxiosService from './axios.service'
import type { ItemResponse, RootServiceInterface } from './index.service'

export enum OrderStatus {
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

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
  _id: string
  userId: string
  orderNumber: string
  items: Item[]
  subtotal: number
  discountTotal: number
  shippingFee: number
  grandTotal: number
  shippingAddress: Address
  status: OrderStatus
  paymentMethod: string
  paymentStatus: string
  notes: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

class OrderService {
  async fetchOrders(): Promise<RootServiceInterface<ItemResponse<OrderResponse[]>>> {
    return await AxiosService.get('/order/user')
  }

  async saveOrder(
    orderData: CheckoutForm
  ): Promise<RootServiceInterface<ItemResponse<OrderResponse>>> {
    return await AxiosService.post('/order', orderData)
  }
}

export default new OrderService()
