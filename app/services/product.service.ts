export interface Product {
  _id?: string
  name?: string
  image?: string
  colors?: string[]
  sizes?: string[]
  qty: number
  price: number
  category?: {
    _id?: string
    name?: string
  }
}
