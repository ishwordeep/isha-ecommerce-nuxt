import AxiosService from './axios.service'
import type { ListResponse, RootServiceInterface } from './index.service'

export interface CategoryResponse {
  _id: string
  name: string
  slug: string
  description: string
  isActive: boolean
  image: string
  displayOrder: number
  createdAt: string
  updatedAt: string
  __v: number
  productCount: number
}

class CategoryService {
  /**
   * Fetch categories
   * @return {Promise<{ data: CategoryResponse[] | null; error: any }>}
   * */
  async fetchCategories(): Promise<RootServiceInterface<ListResponse<CategoryResponse>>> {
    const url = `/frontend/category`
    return await AxiosService.get<ListResponse<CategoryResponse>>(url)
  }
}

export default new CategoryService()
