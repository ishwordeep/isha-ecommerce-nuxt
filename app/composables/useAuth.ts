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
    //stores

    const cartStore = useCartStore()
    const checkoutStore = useCheckoutStore()
    const orderStore = useOrderStore()
    // await AuthService.logout()
    cartStore.reset()
    checkoutStore.reset()
    orderStore.reset()
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

  const updateShippingAddress = async (addressId: string, payload: Partial<AddressForm>) => {
    try {
      const response = await AuthService.updateShippingAddress(addressId, payload)
      if (response.data?.success && response.data.data) {
        authStore.updateShippingAddress(response.data.data)
      }
      return response
    } catch (error) {
      console.error('Error updating shipping address:', error)
    }
  }

  const deleteShippingAddress = async (addressId: string) => {
    try {
      const response = await AuthService.deleteShippingAddress(addressId)
      if (response.data?.success) {
        authStore.deleteShippingAddress(addressId)
      }
      return response
    } catch (error) {
      console.error('Error deleting shipping address:', error)
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
    updateShippingAddress,
    deleteShippingAddress,
  }
}
