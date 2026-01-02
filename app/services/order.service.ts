import type { Address } from './auth.service'
import AxiosService from './axios.service'
import type {
  ItemResponse,
  ListResponse,
  QueryInterface,
  RootServiceInterface,
} from './index.service'

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

export interface PaymentIntent {
  orderId: string
  clientSecret: string
  paymentIntentId: string
  amount: number
  currency: string
}

class OrderService {
  async fetchOrders({
    page = 1,
    limit = 10,
    search = '',
    status = '',
  }: QueryInterface): Promise<RootServiceInterface<ListResponse<OrderResponse>>> {
    let url = `/order/user?page=${page}&limit=${limit}`
    if (search) {
      url += `&search=${encodeURIComponent(search)}`
    }
    if (status) {
      url += `&status=${encodeURIComponent(status)}`
    }
    return await AxiosService.get(url)
  }

  async saveOrder(
    orderData: CheckoutForm
  ): Promise<RootServiceInterface<ItemResponse<OrderResponse>>> {
    return await AxiosService.post('/order', orderData)
  }

  async fetchOrderById(
    orderId: string
  ): Promise<RootServiceInterface<ItemResponse<OrderResponse>>> {
    return await AxiosService.get(`/order/${orderId}`)
  }

  async initiatePayment(
    orderId: string
  ): Promise<RootServiceInterface<ItemResponse<PaymentIntent>>> {
    return await AxiosService.post(`/order/${orderId}/payment-intent`, {})
  }
}

export default new OrderService()
