import React from 'react'
import CookieToken from '../Token/CookieToken'
import { AuthContextInterface, AuthProviderProps } from '../interfaces'
import Token from '../Token/Token'

const AuthContext = React.createContext<AuthContextInterface>({
  token: new CookieToken({})
})

const AuthProvider: React.FunctionComponent<AuthProviderProps> = (
  props: AuthProviderProps
) => {
  if (!props.tokenGenerator)
    throw new Error('No tokenGenerator specified in AuthProvider')

  const [tokenState] = React.useState<Token>(props.tokenGenerator())

  return (
    <AuthContext.Provider value={{ token: tokenState }}>
      {props.children}
    </AuthContext.Provider>
  )
}

AuthProvider.defaultProps = {
  tokenGenerator: () => new CookieToken({})
}

export default AuthProvider
const AuthContextConsumer = AuthContext.Consumer
export { AuthContext, AuthContextConsumer }
