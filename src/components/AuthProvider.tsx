import React from 'react'
import CookieToken from '../Token/CookieToken'
import { AuthContextInterface, AuthProviderProps } from '../interfaces'

/**
 * The AuthContext that allow access to Token object and fetchRefreshToken method
 */
const AuthContext = React.createContext<AuthContextInterface>({
  token: new CookieToken({}),
  fetchRefreshToken: () => new Promise<string>((resolve) => resolve(''))
})

/**
 * The AuthProvider component that provide AuthContext to children
 * @param props AuthProviderProps
 */
const AuthProvider: React.FunctionComponent<AuthProviderProps> = (
  props: AuthProviderProps
) => {
  if (!props.tokenGenerator)
    throw new Error('No tokenGenerator specified in AuthProvider')

  return (
    <AuthContext.Provider
      value={{
        token: props.tokenGenerator(),
        fetchRefreshToken: props.fetchRefreshToken
      }}
    >
      <React.Fragment>{props.children}</React.Fragment>
    </AuthContext.Provider>
  )
}

AuthProvider.defaultProps = {
  tokenGenerator: () => new CookieToken({})
}

export default AuthProvider
const AuthContextConsumer = AuthContext.Consumer
export { AuthContext, AuthContextConsumer }
