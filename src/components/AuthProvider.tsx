import React, { useContext, useEffect } from 'react'
import CookieToken from '../Token/CookieToken'
import {
  AuthContextInterface,
  AuthProviderProps,
  SubAuthProviderProps
} from '../interfaces'
import Token from '../Token/Token'
import { useAuth } from '..'

const AuthContext = React.createContext<AuthContextInterface>({
  token: new CookieToken({}),
  fetchRefreshToken: () => new Promise<string>((resolve) => resolve(''))
})

const AuthProvider: React.FunctionComponent<AuthProviderProps> = (
  props: AuthProviderProps
) => {
  if (!props.tokenGenerator)
    throw new Error('No tokenGenerator specified in AuthProvider')

  const [tokenState] = React.useState<Token>(props.tokenGenerator())

  return (
    <AuthContext.Provider
      value={{ token: tokenState, fetchRefreshToken: props.fetchRefreshToken }}
    >
      <SubAuthProvider>{props.children}</SubAuthProvider>
    </AuthContext.Provider>
  )
}

AuthProvider.defaultProps = {
  tokenGenerator: () => new CookieToken({})
}

const SubAuthProvider = (props: SubAuthProviderProps) => {
  const authContext = useContext(AuthContext)
  const auth = useAuth()
  console.log('SubAuthProvider')
  useEffect(() => {
    console.log(authContext)
    if (auth.hasToRefreshAccessToken()) {
      auth.refreshToken()
    }
  }, [auth, authContext, auth.hasToRefreshAccessToken()])
  return <React.Fragment>{props.children}</React.Fragment>
}

export default AuthProvider
const AuthContextConsumer = AuthContext.Consumer
export { AuthContext, AuthContextConsumer }
