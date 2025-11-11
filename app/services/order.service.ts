import type { ProductResponse } from '~/services/product.service'

export interface OrderResponse {
  _id: string
  date: string
  status: string
  total: number
  items: number
  products: ProductResponse[]
}
