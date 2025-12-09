import AxiosService from '~/services/axios.service'
import type { ItemResponse, RootServiceInterface } from './index.service'

export interface AboutResponse {
  hero: Hero
  statements: Statement[]
  productStory: ProductStory[]
  team: Team[]
  coreValues: CoreValue[]
}

export interface CoreValue {
  icon: string
  color: string
  title: string
  description: string
}

export interface Team {
  name: string
  titleRole: string
  shortBio: string
  imageUrl: string
}

export interface ProductStory {
  year: string
  milestoneTitle: string
  description: string
}

export interface Statement {
  icon: string
  iconBackgroundColor: string
  title: string
  description: string
}

export interface Hero {
  mainTitle: string
  subtitle: string
  buttonText: string
  stats: Stat[]
}

export interface Stat {
  number: string
  label: string
}

class AboutService {
  async fetchAbout(): Promise<RootServiceInterface<ItemResponse<AboutResponse>>> {
    return await AxiosService.get<ItemResponse<AboutResponse>>('/setting/about')
  }
}

export default new AboutService()
