import AxiosService from './axios.service'
import type { ListResponse, RootServiceInterface } from './index.service'

export interface SliderResponse {
  _id: string
  image: string
  displayOrder: number
  isActive: boolean
  isButtonEnabled: boolean
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

class SliderService {
  async fetchSliders(): Promise<RootServiceInterface<ListResponse<SliderResponse>>> {
    const url = `/frontend/slider`
    return await AxiosService.get<ListResponse<SliderResponse>>(url)
  }
}

export default new SliderService()
