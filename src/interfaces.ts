import React from 'react'
import Token from './Token/Token'

export interface SignInInterface {
  accessToken: string
  refreshToken: string
}

export interface AuthHookInterface {
  signIn: (params: SignInInterface) => void
  signOut: () => void
  setAccessToken: (newAccessToken: string) => void
  setRefreshToken: (newRefreshToken: string) => void
  isAuthenticated: () => boolean
  hasToRefreshAccessToken: () => boolean
  refreshToken: () => Promise<void>
  getUserClaims: () => object
}
export interface AuthContextInterface {
  token: Token
  fetchRefreshToken: () => Promise<string>
}

export interface AuthProviderProps {
  children: React.ReactNode
  tokenGenerator?: () => Token
  fetchRefreshToken: () => Promise<string>
}
