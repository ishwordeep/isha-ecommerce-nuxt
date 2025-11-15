import type { LoginCredentials, RegisterCredentials } from '~/stores/auth.store'
import AxiosService from './axios.service'
import type { ItemResponse, RootServiceInterface } from './index.service'
export interface Address {
  _id: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  apartment: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface User {
  shippingAddresses: Address[]
  _id: string
  email: string
  password: string
  phone: string
  name: string
  role: string
  createdAt: string
  updatedAt: string
  image?: string
  __v: number
}

interface LoginResponse {
  data: {
    user: User
    accessToken: string
    xAccessToken?: string
  }
}

interface RegisterResponse {
  data: { user: User; accessToken: string; xAccessToken?: string }
}

interface AuthServiceResponse<T> {
  data?: T
  error?: any
}

class AuthService {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthServiceResponse<LoginResponse>> {
    return await AxiosService.post<LoginResponse, LoginCredentials>('/auth/login', credentials)
  }

  /**
   * Register new user
   */
  async register(credentials: RegisterCredentials): Promise<AuthServiceResponse<RegisterResponse>> {
    return await AxiosService.post<RegisterResponse, RegisterCredentials>(
      '/auth/register',
      credentials
    )
  }

  /**
   * Logout user
   */
  async logout(): Promise<AuthServiceResponse<void>> {
    return await AxiosService.post<void, {}>('/auth/logout', {})
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<AuthServiceResponse<ItemResponse<User>>> {
    return await AxiosService.get<ItemResponse<User>>('/user/profile')
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<AuthServiceResponse<{ accessToken: string }>> {
    return await AxiosService.post<{ accessToken: string }, {}>('/auth/refresh', {})
  }

  /**
   * Forgot password
   */
  async forgotPassword(email: string): Promise<AuthServiceResponse<{ message: string }>> {
    return await AxiosService.post<{ message: string }, { email: string }>(
      '/auth/forgot-password',
      { email }
    )
  }

  /**
   * Reset password
   */
  async resetPassword(
    token: string,
    password: string
  ): Promise<AuthServiceResponse<{ message: string }>> {
    return await AxiosService.post<{ message: string }, { token: string; password: string }>(
      '/auth/reset-password',
      { token, password }
    )
  }

  /**
   * Change password
   */
  async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<AuthServiceResponse<{ message: string }>> {
    return await AxiosService.post<
      { message: string },
      { oldPassword: string; newPassword: string }
    >('/auth/change-password', { oldPassword, newPassword })
  }

  async addShippingAddress(
    payload: AddressForm
  ): Promise<RootServiceInterface<ItemResponse<User>>> {
    return await AxiosService.post<ItemResponse<User>>('/user/shipping-address', payload)
  }
}

export default new AuthService()
