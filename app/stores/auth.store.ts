// auth.store.ts
import { defineStore } from 'pinia'
import { getCookie, setCookie, deleteCookie } from '../utils/cookie.utils'

export interface User {
  id: number
  email: string
  name: string
  role?: string

  [key: string]: any
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  name: string
}

export interface AuthState {
  user: User | null
  accessToken: string | null
  xAccessToken: string | null
  isAuthenticated: boolean
  loading: boolean
}

// Cookie options - customize as needed
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  path: '/',
  secure: import.meta.env.PROD, // Only secure in production (Vite convention)
  sameSite: 'lax' as const,
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    // Initialize from cookies immediately if on client
    let initialState: AuthState = {
      user: null,
      accessToken: null,
      xAccessToken: null,
      isAuthenticated: true,
      loading: false,
    }

    if (typeof window !== 'undefined') {
      const accessToken = getCookie('accessToken')
      const userCookie = getCookie('user')

      if (accessToken && userCookie) {
        try {
          initialState = {
            ...initialState,
            accessToken,
            xAccessToken: getCookie('xAccessToken'),
            user: JSON.parse(userCookie),
            isAuthenticated: true,
          }
        } catch (e) {
          console.error('Failed to parse user cookie:', e)
        }
      }
    }

    return initialState
  },

  getters: {
    getUser: (state): User | null => state.user,
    isLoggedIn: (state): boolean => state.isAuthenticated,
    isLoading: (state): boolean => state.loading,
  },

  actions: {
    /**
     * Initialize auth state from cookies
     */
    initAuth() {
      if (typeof window !== 'undefined') {
        const accessToken = getCookie('accessToken')
        const xAccessToken = getCookie('xAccessToken')
        const userCookie = getCookie('user')

        if (accessToken && userCookie) {
          try {
            this.accessToken = accessToken
            this.xAccessToken = xAccessToken
            this.user = JSON.parse(userCookie)
            this.isAuthenticated = true
          } catch (e) {
            console.error('Failed to parse user cookie:', e)
            this.clearAuth()
          }
        }
      }
    },

    /**
     * Set user and tokens after successful login
     */
    setAuth(user: User, accessToken: string, xAccessToken?: string) {
      this.user = user
      this.accessToken = accessToken
      this.xAccessToken = xAccessToken || null
      this.isAuthenticated = true

      // Save to cookies
      if (typeof window !== 'undefined') {
        setCookie('accessToken', accessToken, COOKIE_OPTIONS)
        if (xAccessToken) {
          setCookie('xAccessToken', xAccessToken, COOKIE_OPTIONS)
        }
        setCookie('user', JSON.stringify(user), COOKIE_OPTIONS)
      }
    },

    /**
     * Clear auth state and logout
     */
    clearAuth() {
      this.user = null
      this.accessToken = null
      this.xAccessToken = null
      this.isAuthenticated = false

      // Clear cookies
      if (typeof window !== 'undefined') {
        deleteCookie('accessToken', { path: '/' })
        deleteCookie('xAccessToken', { path: '/' })
        deleteCookie('user', { path: '/' })
      }
      navigateTo('/login')
    },

    /**
     * Set loading state
     */
    setLoading(loading: boolean) {
      this.loading = loading
    },

    /**
     * Update user information
     */
    updateUser(userData: Partial<User>) {
      if (this.user) {
        this.user = { ...this.user, ...userData }

        if (typeof window !== 'undefined') {
          setCookie('user', JSON.stringify(this.user), COOKIE_OPTIONS)
        }
      }
    },
  },
})
