import AxiosService from './axios.service'
import type { ItemResponse, RootServiceInterface } from './index.service'

export interface SettingResponse {
  _id: string
  name: string
  description: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  country: string
  postalCode: string
  logoUrl: string
  faviconUrl: string
  facebook: string
  instagram: string
  tiktok: string
  createdAt: string
  updatedAt: string
  sizeGuides: string
  returnAndExchanges: string
  shippingInformations: string
  __v: number
}

class SettingService {
  async fetchSetting(): Promise<RootServiceInterface<ItemResponse<SettingResponse>>> {
    return await AxiosService.get<ItemResponse<SettingResponse>>('/setting')
  }
}
export default new SettingService()
