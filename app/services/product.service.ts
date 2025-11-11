import AxiosService from '~/services/axios.service'
import type {
  ItemResponse,
  ListResponse,
  QueryInterface,
  RootServiceInterface,
} from '~/services/index.service'

export interface ProductResponse {
  _id: string
  name: string
  slug: string
  category: string
  description: string
  image: string
  images: string[]
  price: number
  discount: number
  sizes: string[]
  colors: string[]
  isActive: boolean
  isFeatured: boolean
  isNew: boolean
  isTrending: boolean
  tags: string[]
  createdAt?: string
  updatedAt: string
  __v: number
  categoryDetails: CategoryDetails
}

export interface CategoryDetails {
  _id: string
  name: string
}

class ProductService {
  async fetchProducts({
    page,
    limit,
    search,
    category,
  }: QueryInterface): Promise<RootServiceInterface<ListResponse<ProductResponse>>> {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) })
    if (search) params.append('search', search)
    if (category) params.append('category', category)
    const url = `/frontend/product?${params.toString()}`
    return await AxiosService.get<ListResponse<ProductResponse>>(url)
  }

  async getProduct(id: string): Promise<RootServiceInterface<ItemResponse<ProductResponse>>> {
    return await AxiosService.get<ItemResponse<ProductResponse>>(`/frontend/product/${id}`)
  }

  async getProductsByCategory(
    categoryId: string,
    search: string
  ): Promise<RootServiceInterface<ListResponse<ProductResponse>>> {
    let url = `/frontend/product/category/${categoryId}`
    if (search) url += `?search=${search}`
    return await AxiosService.get<ListResponse<ProductResponse>>(url)
  }

  async getProductsByFlag(
    flag: string
  ): Promise<RootServiceInterface<ListResponse<ProductResponse>>> {
    return await AxiosService.get<ListResponse<ProductResponse>>(`/frontend/product/flag/${flag}`)
  }
}

export default new ProductService()
