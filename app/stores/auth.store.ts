import { defineStore } from 'pinia'
import type { Address, User } from '~/services/auth.service'

type Mode = 'add' | 'edit'

export interface AddressForm {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  apartment: string
  isDefault: boolean
}

export interface UserProfileForm {
  name: string
  phone?: string
  image?: string
  email?: string
}

const mapAddressToForm = (address: Address | null): AddressForm => {
  if (!address) return emptyAddressForm()
  return {
    street: address.street,
    city: address.city,
    state: address.state,
    zipCode: address.zipCode,
    country: address.country,
    isDefault: address.isDefault,
    apartment: address.apartment,
  }
}

const emptyAddressForm = (): AddressForm => ({
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  apartment: '',
  isDefault: false,
})

const emptyUserProfileForm = (): UserProfileForm => ({
  name: '',
  phone: '',
  image: '',
  email: '',
})

const mapUserToProfileForm = (user: User | null): UserProfileForm => {
  if (!user) return emptyUserProfileForm()
  return {
    name: user.name,
    phone: user.phone,
    image: user.image,
    email: user.email,
  }
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  name: string
  phone?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(null)
  const xAccessToken = ref<string | null>(null)
  const isAuthenticated = ref<boolean>(false)
  const isHydrated = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const mode = ref<Mode>('add')
  const selectedAddress = ref<Address | null>(null)
  const addressFormInputs = reactive<AddressForm>(emptyAddressForm())
  const userProfileFormInputs = reactive<UserProfileForm>(emptyUserProfileForm())
  const isFetchingProfile = ref<boolean>(false)
  const setLoading = (loading: boolean): void => {
    isLoading.value = loading
  }

  const setIsFetchingProfile = (loading: boolean): void => {
    isFetchingProfile.value = loading
  }

  const initializeUserProfileForm = async () => {
    isLoading.value = true
    try {
      if (user.value) Object.assign(userProfileFormInputs, mapUserToProfileForm(user.value))
    } finally {
      isLoading.value = false
    }
  }

  const initializeAddressForAdd = () => {
    mode.value = 'add'
    Object.assign(addressFormInputs, emptyAddressForm())
  }

  const initializeAddressForEdit = async (address: Address) => {
    mode.value = 'edit'
    isLoading.value = true
    try {
      selectedAddress.value = address
      if (address) Object.assign(addressFormInputs, mapAddressToForm(address))
    } finally {
      isLoading.value = false
    }
  }

  //
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken')
    if (token && token !== 'undefined') {
      accessToken.value = token
      xAccessToken.value = localStorage.getItem('xAccessToken') ?? null
      isAuthenticated.value = true
      isHydrated.value = true
    }
  }

  const initAuth = async (): Promise<void> => {
    isLoading.value = true
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken')
      const xToken = localStorage.getItem('xAccessToken')

      if (token) {
        accessToken.value = token
        xAccessToken.value = xToken ?? null
        isAuthenticated.value = true
      }
      isHydrated.value = true
    }
    isLoading.value = false
  }

  const setAuth = (token: string, xToken?: string): void => {
    accessToken.value = token
    xAccessToken.value = xToken ?? null
    isAuthenticated.value = true
    isHydrated.value = true

    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token)
      if (xToken) localStorage.setItem('xAccessToken', xToken)
    }
  }

  const clearAuth = (): void => {
    user.value = null
    accessToken.value = null
    xAccessToken.value = null
    isAuthenticated.value = false
    isHydrated.value = true

    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('xAccessToken')
    }
  }

  const setUser = (_user: User): void => {
    user.value = _user as User
  }

  const resetAddressForm = (): void => {
    Object.assign(addressFormInputs, emptyAddressForm())
  }

  return {
    initAuth,
    setAuth,
    clearAuth,
    setUser,
    initializeUserProfileForm,
    initializeAddressForAdd,
    initializeAddressForEdit,
    resetAddressForm,
    setLoading,
    setIsFetchingProfile,
    isFetchingProfile,
    user,
    accessToken,
    xAccessToken,
    isAuthenticated,
    isHydrated,
    isLoading,
    selectedAddress,
    mode,
    addressFormInputs,
    userProfileFormInputs,
  }
})
