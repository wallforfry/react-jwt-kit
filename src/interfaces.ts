import React from 'react'
import Token from './Token/Token'

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
 * @param setAccessToken Function to set the Access Token
 * @param setRefreshToken Function to set the Refresh Token
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
   * Set the Access Token
   * @param {string} newAccessToken
   */
  setAccessToken: (newAccessToken: string) => void
  /**
   * Set the Refresh Token
   * @param {string} newRefreshToken
   */
  setRefreshToken: (newRefreshToken: string) => void
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
   * @returns {Promise<void>} Promise\<void\> When the token is refreshed
   */
  refreshToken: () => Promise<void>
  /**
   * Get user claims from Access Token
   * @returns {object} The user claims stored is Access Token payload
   */
  getUserClaims: () => object
}

/**
 * @interface AuthContextInterface
 * @param {token} token Token object
 * @param fetchRefreshToken Function that return new AccessToken as Promise\<string\>
 */
export interface AuthContextInterface {
  /**
   * Token object
   */
  token: Token
  /**
   * Function that return new AccessToken as Promise\<string\>
   * @returns {Promise<string>} Promise\<string\> of the new Access Token
   */
  fetchRefreshToken: () => Promise<string>
}

/**
 * @interface AuthProviderProps
 * @param children Children component
 * @param tokenGenerator Function that return a subclass of Token
 * @param fetchRefreshToken Function that return new AccessToken as Promise\<string\>
 */
export interface AuthProviderProps {
  children: React.ReactNode
  /**
   * Function that return a subclass of Token
   * @returns {Token} Token subclass
   */
  tokenGenerator?: () => Token
  /**
   * Function that return new AccessToken as Promise\<string\>
   * @returns {Promise<string>} Promise\<string\> of the new Access Token
   */
  fetchRefreshToken: () => Promise<string>
}
