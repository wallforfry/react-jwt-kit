import React from 'react'
import { AuthContext } from '../components/AuthProvider'
import Token from '../Token/Token'

/**
 * Token Hook
 *
 * @returns - Token
 */
function useToken(): Token {
  const c = React.useContext(AuthContext)

  return c.token
}

export default useToken
