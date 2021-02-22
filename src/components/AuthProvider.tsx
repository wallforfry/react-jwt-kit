import React from 'react'
import { AuthProviderProps } from '../interfaces'
import { authReducer } from '../store/AuthReducer'
import { AuthContextProvider } from './AuthContext'

/**
 * The AuthProvider component that provide AuthContext to children
 * @param props AuthProviderProps
 */
const AuthProvider: React.FunctionComponent<
  React.PropsWithChildren<AuthProviderProps>
> = (props: React.PropsWithChildren<AuthProviderProps>) => {
  const authContextValue = React.useReducer(authReducer, props.token)

  return (
    <AuthContextProvider value={authContextValue}>
      {props.children}
    </AuthContextProvider>
  )
}

export default AuthProvider
