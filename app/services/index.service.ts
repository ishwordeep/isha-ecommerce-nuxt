export interface RootServiceInterface<T> {
  data?: T
  error?: any
}

export interface PaginationInterface {
  total: number
  page: number
  limit: number
  pages: number
}

export interface ListResponse<T> {
  data: T[] | null
  message: string
  success: boolean
  pagination: PaginationInterface
}

export interface ItemResponse<T> {
  data: T | null
  message: string
  success: boolean
}

export interface QueryInterface {
  page: number
  limit: number
  search?: string
  category?: string
  sort?: string
}
