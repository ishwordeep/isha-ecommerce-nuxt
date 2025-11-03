// auth.header.ts
import { getCookie } from '../utils/cookie.utils'

interface AuthHeaders {
  Authorization?: string
  'X-Authorization'?: string
}

export default function AuthHeader(): AuthHeaders {
  let accessToken: string | null = ''
  let xAccessToken: string | null = ''

  // Check if we're in the browser environment
  if (typeof window !== 'undefined') {
    accessToken = getCookie('accessToken')
    xAccessToken = getCookie('xAccessToken')
  }

  return {
    ...(accessToken && {
      Authorization: 'Bearer ' + accessToken,
    }),
    ...(xAccessToken && {
      'X-Authorization': 'Bearer ' + xAccessToken,
    }),
  }
}
