export interface Product {
  _id?: string
  name?: string
  image?: string
  color?: string
  size?: string
  qty: number
  price: number
  category?: {
    _id?: string
    name?: string
  }
}
