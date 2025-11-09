export interface OrderResponse {
  _id: string
  date: string
  status: string
  total: number
  items: number
  products: Product[]
}

export interface Product {
  _id?: string
  name?: string
  image?: string
  color?: string
  size?: string
  qty: number
  price: number
}
