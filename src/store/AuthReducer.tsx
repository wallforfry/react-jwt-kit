import { SignInInterface } from '../interfaces'
import Token from '../Token/Token'

export type ACTIONTYPE =
  | { type: 'LOGIN_SUCCESS'; payload: SignInInterface }
  | { type: 'LOGOUT_SUCCESS' }
  | { type: 'REFRESH_TOKEN_REQUEST' }
  | { type: 'REFRESH_TOKEN_SUCCESS'; newAccessToken: string }
  | { type: 'REFRESH_TOKEN_ERROR' }

export function authReducer(state: Token, action: ACTIONTYPE) {
  console.debug('Reducer calling', action.type)
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      state.setRefreshToken(action.payload.refreshToken)
      state.setAccessToken(action.payload.accessToken)
      return state

    case 'LOGOUT_SUCCESS':
      state.unsetRefreshToken()
      state.unsetAccessToken()
      return state

    case 'REFRESH_TOKEN_REQUEST':
      return state

    case 'REFRESH_TOKEN_SUCCESS':
      state.setAccessToken(action.newAccessToken)
      return state

    case 'REFRESH_TOKEN_ERROR':
      state.unsetAccessToken()
      state.unsetRefreshToken()
      return state

    default:
      throw new Error(`Unhandled action type: ${action}`)
  }
}
