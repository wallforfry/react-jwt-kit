import { AuthHookInterface, SignInInterface } from './../interfaces'
import React from 'react'
import { AuthContext } from '../components/AuthProvider'

/**
 * Auth Hook
 *
 * @returns {AuthInterface} AuthInterface
 */
function useAuth(): AuthHookInterface {
  const c = React.useContext(AuthContext)

  /**
   * @inheritdoc `AuthHookInterface.signIn`
   */
  const signIn = (params: SignInInterface) => {
    if (params.accessToken) c.token.setAccessToken(params.accessToken)
    if (params.refreshToken) c.token.setRefreshToken(params.refreshToken)
  }

  /**
   * @inheritdoc `AuthHookInterface.signOut`
   */
  const signOut = () => {
    c.token.unsetAccessToken()
    c.token.unsetRefreshToken()
  }

  /**
   * @inheritdoc `AuthHookInterface.setAccessToken`
   */
  const setAccessToken = (newAccessToken: string) => {
    if (newAccessToken) c.token.setAccessToken(newAccessToken)
  }

  /**
   * @inheritdoc `AuthHookInterface.setRefreshToken`
   */
  const setRefreshToken = (newRefreshToken: string) => {
    if (newRefreshToken) c.token.setRefreshToken(newRefreshToken)
  }

  /**
   * @inheritdoc `AuthHookInterface.isAuthenticated`
   */
  const isAuthenticated = () => {
    return !c.token.isAccessTokenExpired()
  }

  /**
   * @inheritdoc `AuthHookInterface.hasToRefreshToken`
   */
  const hasToRefreshAccessToken = () => {
    return c.token.isAccessTokenExpired() && !c.token.isRefreshTokenExpired()
  }

  /**
   * @inheritdoc `AuthHookInterface.refreshToken`
   */
  const refreshToken = () => {
    return c.fetchRefreshToken().then((accessToken: string) => {
      setAccessToken(accessToken)
    })
  }

  /**
   * @inheritdoc `AuthHookInterface.getUserClaims`
   */
  const getUserClaims = () => {
    return c.token.getUserClaims()
  }

  return {
    signIn,
    signOut,
    setAccessToken,
    setRefreshToken,
    isAuthenticated,
    hasToRefreshAccessToken,
    refreshToken,
    getUserClaims
  }
}

export default useAuth
