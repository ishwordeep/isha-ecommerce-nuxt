import type { Address } from './auth.service'
import AxiosService from './axios.service'
import type { ItemResponse, QueryInterface, RootServiceInterface } from './index.service'

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
  status: string
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
  async fetchOrders({
    page,
    limit,
    search,
    status,
  }: QueryInterface): Promise<RootServiceInterface<ItemResponse<OrderResponse[]>>> {
    const params = new URLSearchParams()
    if (search) {
      params.append('search', search)
    }
    if (status) {
      params.append('status', status)
    }
    const url = `/order/user?${params.toString()}`
    return await AxiosService.get(url)
  }

  async saveOrder(
    orderData: CheckoutForm
  ): Promise<RootServiceInterface<ItemResponse<OrderResponse>>> {
    return await AxiosService.post('/order', orderData)
  }
}

export default new OrderService()
