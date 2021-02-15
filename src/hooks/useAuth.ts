import React from 'react'
import { AuthContext } from '../components/AuthProvider'

interface SignInInterface {
  accessToken: string
  refreshToken: string
}

interface AuthInterface {
  signIn: (params: SignInInterface) => void
  signOut: () => void
  setAccessToken: (newAccessToken: string) => void
  setRefreshToken: (newRefreshToken: string) => void
  isAuthenticated: () => boolean
  hasToRefreshAccessToken: () => boolean
}

/**
 * Auth Hook
 *
 * @returns - AuthInterface
 */
function useAuth(): AuthInterface {
  const c = React.useContext(AuthContext)

  const signIn = (params: SignInInterface) => {
    if (params.accessToken) c.token.setAccessToken(params.accessToken)
    if (params.refreshToken) c.token.setRefreshToken(params.refreshToken)
  }

  const signOut = () => {
    c.token.unsetAccessToken()
    c.token.unsetRefreshToken()
  }

  const setAccessToken = (newAccessToken: string) => {
    if (newAccessToken) c.token.setAccessToken(newAccessToken)
  }

  const setRefreshToken = (newRefreshToken: string) => {
    if (newRefreshToken) c.token.setRefreshToken(newRefreshToken)
  }

  const isAuthenticated = () => {
    return !c.token.isAccessTokenExpired()
  }

  const hasToRefreshAccessToken = () => {
    return c.token.isAccessTokenExpired() && !c.token.isRefreshTokenExpired()
  }

  return {
    signIn,
    signOut,
    setAccessToken,
    setRefreshToken,
    isAuthenticated,
    hasToRefreshAccessToken
  }
}

export default useAuth
