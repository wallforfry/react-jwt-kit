import { useAuthContext } from '../components/AuthContext'
import Token from '../Token/Token'

/**
 * Token Hook
 *
 * @returns {Token} Token
 */
function useToken(): Token {
  const c = useAuthContext()

  return c[0]
}

export default useToken
