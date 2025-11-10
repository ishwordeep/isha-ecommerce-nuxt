export interface SliderResponse {
  _id: string
  slug: string
  isActive: boolean
  image: string
  displayOrder?: number
  createdAt?: string
  updatedAt?: string
  isButtonEnabled: boolean
  button?: {
    link: string
    title: string
    textColor: string
    bgColor: string
  }
  __v?: number
}
