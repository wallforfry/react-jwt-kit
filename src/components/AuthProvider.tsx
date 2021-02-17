import React from 'react'
import CookieToken from '../Token/CookieToken'
import { AuthContextInterface, AuthProviderProps } from '../interfaces'

const AuthContext = React.createContext<AuthContextInterface>({
  token: new CookieToken({}),
  fetchRefreshToken: () => new Promise<string>((resolve) => resolve(''))
})

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
