import React from 'react'
import Token from './Token/Token'
import { ACTIONTYPE } from './store/AuthReducer'
/**
 * Interface for the useAuth SignIn function
 * @interface SignInInterface
 * @param accessToken Access Token as string
 * @param refreshToken Refresh Token as string
 */
export interface SignInInterface {
  /**
   * Access Token
   */
  accessToken: string
  /**
   * Refresh Token
   */
  refreshToken: string
}

/**
 * @interface AuthHookInterface
 * @param signIn SignIn function
 * @param signOut SignOut function
 * @param isAuthenticated Function to check if user is authenticated
 * @param hasToRefreshAccessToken Function to check if Access Token is expired but Refresh Token is still valid
 * @param refreshToken Function that trigger the Access Token refresh with Refresh Token
 * @param getUserClaims Function that return user claims from Access Token
 */
export interface AuthHookInterface {
  /**
   * SignIn function
   * @param {SignInInterface} { accessToken, refreshToken }
   */
  signIn: (params: SignInInterface) => void
  /**
   * SignOut function
   */
  signOut: () => void
  /**
   * Check if user is authenticated
   * @returns {boolean} true if the user is authenticated
   */
  isAuthenticated: () => boolean
  /**
   * Check if Access Token is expired but Refresh Token is still valid
   * @returns {boolean} true if Access Token is expired & Refresh Token is not expired
   */
  hasToRefreshAccessToken: () => boolean
  /**
   * Trigger the Access Token refresh with Refresh Token
   * @returns {Promise<boolean>} Promise\<boolean\> true if the token is refreshed
   */
  refreshToken: () => Promise<boolean>
  /**
   * Get user claims from Access Token
   * @returns {object} The user claims stored is Access Token payload
   */
  getUserClaims: () => object
}

export type AuthContextType = [Token, React.Dispatch<ACTIONTYPE>]

/**
 * @interface AuthProviderProps
 * @param token Function that return a subclass of Token
 */
export interface AuthProviderProps {
  /**
   * Function that return a subclass of Token
   * @returns {Token} Token subclass
   */
  token: Token
}
export interface SyncTokensInterface {
  accessToken?: string
  refreshToken?: string
}
