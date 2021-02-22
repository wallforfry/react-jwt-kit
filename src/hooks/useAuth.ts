import { AuthHookInterface, SignInInterface } from './../interfaces'
import { useAuthContext } from '../components/AuthContext'

/**
 * Auth Hook
 *
 * @returns {AuthInterface} AuthInterface
 */
function useAuth(): AuthHookInterface {
  const [authContext, dispatch] = useAuthContext()

  /**
   * @inheritdoc `AuthHookInterface.signIn`
   */
  const signIn = (params: SignInInterface) => {
    dispatch({ type: 'LOGIN_SUCCESS', payload: params })
  }

  /**
   * @inheritdoc `AuthHookInterface.signOut`
   */
  const signOut = () => {
    dispatch({ type: 'LOGOUT_SUCCESS' })
  }

  /**
   * @inheritdoc `AuthHookInterface.isAuthenticated`
   */
  const isAuthenticated = () => {
    return authContext.isAuthenticated()
  }

  /**
   * @inheritdoc `AuthHookInterface.hasToRefreshToken`
   */
  const hasToRefreshAccessToken = () => {
    return authContext.hasToRefreshAccessToken()
  }

  /**
   * @inheritdoc `AuthHookInterface.refreshToken`
   */
  const refreshToken = (): Promise<boolean> => {
    dispatch({ type: 'REFRESH_TOKEN_REQUEST' })
    return authContext
      .fetchRefreshToken()
      .then((newAccessToken: string) => {
        dispatch({ type: 'REFRESH_TOKEN_SUCCESS', newAccessToken })
        return true
      })
      .catch(() => {
        dispatch({ type: 'REFRESH_TOKEN_ERROR' })
        return false
      })
  }

  /**
   * @inheritdoc `AuthHookInterface.getUserClaims`
   */
  const getUserClaims = () => {
    return authContext.getUserClaims()
  }

  return {
    signIn,
    signOut,
    isAuthenticated,
    hasToRefreshAccessToken,
    refreshToken,
    getUserClaims
  }
}

export default useAuth
