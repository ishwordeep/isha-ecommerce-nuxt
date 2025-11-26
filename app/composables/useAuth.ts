import AuthService from '~/services/auth.service'
import type { AddressForm, LoginCredentials, RegisterCredentials } from '~/stores/auth.store'
import { useAuthStore } from '~/stores/auth.store'

export const useAuth = () => {
  const authStore = useAuthStore()
  /**
   * Login user
   */
  const login = async (credentials: LoginCredentials) => {
    authStore.setLoading(true)

    const { data, error } = await AuthService.login(credentials)
    authStore.setLoading(false)

    if (data?.data) {
      authStore.setAuth(data.data.accessToken, data.data.xAccessToken)
      authStore.setIsFetchingProfile(true)
      await fetchCurrentUser()
      authStore.setIsFetchingProfile(false)
      return { success: true, data }
    }

    return { success: false, error }
  }

  /**
   * Register user
   */
  const register = async (credentials: RegisterCredentials) => {
    authStore.setLoading(true)

    const { data, error } = await AuthService.register(credentials)

    authStore.setLoading(false)

    if (data?.data) {
      authStore.setAuth(data.data.accessToken, data.data.xAccessToken)
      authStore.setIsFetchingProfile(true)
      await fetchCurrentUser()
      authStore.setIsFetchingProfile(false)
      return { success: true, data }
    }

    return { success: false, error }
  }

  /**
   * Logout user
   */
  const logout = async () => {
    // await AuthService.logout()
    authStore.clearAuth()
  }

  /**
   * Fetch current user
   */
  const fetchCurrentUser = async () => {
    const { data, error } = await AuthService.getCurrentUser()

    if (data?.success && data.data) {
      authStore.setUser(data.data)
      return { success: true, data: data.data }
    }

    if (error) {
      authStore.clearAuth()
    }

    return { success: false, error }
  }

  const addShippingAddress = async (_address: AddressForm) => {
    try {
      const response = await AuthService.addShippingAddress(_address)
      if (response.data?.success && response.data.data) {
        authStore.addShippingAddress(response.data.data)
      }
      return response
    } catch (error) {
      console.error('Error adding shipping address:', error)
    }
  }

  return {
    // Store state
    user: computed(() => authStore.user),
    isAuthenticated: computed(() => authStore.isAuthenticated),
    isLoading: computed(() => authStore.isLoading),

    // Actions
    login,
    register,
    logout,
    fetchCurrentUser,
    addShippingAddress,
  }
}
