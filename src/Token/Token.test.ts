import Token from './Token'
import LocalStorageToken from './LocalStorageToken'
import CookieToken from './CookieToken'
import generateToken from '../test.utils'

class DummyToken extends Token {
  accessToken: undefined | string
  refreshToken: undefined | string

  setAccessToken(token: string): void {
    this.accessToken = token
  }

  getAccessToken(): string | undefined {
    return this.accessToken
  }

  unsetAccessToken(): void {
    this.accessToken = undefined
  }

  setRefreshToken(refreshToken: string): void {
    this.refreshToken = refreshToken
  }

  getRefreshToken(): string | undefined {
    return this.refreshToken
  }

  unsetRefreshToken(): void {
    this.refreshToken = undefined
  }
}

function testTokenClasses(token: Token) {
  it('Has default props', () => {
    // @ts-ignore
    expect(token.accessTokenName).toEqual('_auth_t')
    // @ts-ignore
    expect(token.refreshTokenName).toEqual('_refresh_t')
  })

  it('Can setAccessToken and getAccessToken', () => {
    const { stringToken } = generateToken(1)
    token.getAccessToken()
    expect(token.getAccessToken()).toBeUndefined()
    token.setAccessToken(stringToken)
    expect(token.getAccessToken() === stringToken)
  })

  it('Can unsetAccessToken', () => {
    const { stringToken } = generateToken(1)
    token.setAccessToken(stringToken)
    token.unsetAccessToken()
    expect(token.getAccessToken()).toBeUndefined()
  })

  it('Can getAccessTokenExp', () => {
    const { stringToken, exp } = generateToken(1)
    expect(token.getAccessTokenExp()).toBeUndefined()
    token.setAccessToken(stringToken)
    expect(
      token.getAccessTokenExp()?.getTime() === new Date(exp * 1000).getTime()
    )
  })

  it('isAccessTokenExpired (exp + 10mn)', () => {
    const { stringToken, iat } = generateToken(10)
    token.setAccessToken(stringToken)
    const tokenExpiration = token.getAccessTokenExp()
    if (tokenExpiration)
      expect(tokenExpiration.getTime() / 1000).toBeLessThan(iat)
  })

  it('isAccessTokenExpired (exp - 10mn)', () => {
    const { stringToken, iat } = generateToken(-10)
    token.setAccessToken(stringToken)
    const tokenExpiration = token.getAccessTokenExp()
    if (tokenExpiration)
      expect(tokenExpiration.getTime() / 1000).toBeGreaterThan(iat)
  })

  it('Can setRefreshToken and getRefreshToken', () => {
    const { stringToken } = generateToken(1)
    expect(token.getRefreshToken()).toBeUndefined()
    token.setRefreshToken(stringToken)
    expect(token.getRefreshToken() === stringToken)
  })

  it('Can unsetRefreshToken', () => {
    const { stringToken } = generateToken(1)
    token.setRefreshToken(stringToken)
    token.unsetRefreshToken()
    expect(token.getRefreshToken() === undefined)
  })

  it('isRefreshTokenExpired (exp + 10mn)', () => {
    const { stringToken, iat } = generateToken(10)
    token.setRefreshToken(stringToken)
    const tokenExpiration = token.getRefreshTokenExp()
    if (tokenExpiration)
      expect(tokenExpiration.getTime() / 1000).toBeLessThan(iat)
  })

  it('isRefreshTokenExpired (exp - 10mn)', () => {
    const { stringToken, iat } = generateToken(-10)
    token.setRefreshToken(stringToken)
    const tokenExpiration = token.getRefreshTokenExp()
    if (tokenExpiration)
      expect(tokenExpiration.getTime() / 1000).toBeGreaterThan(iat)
  })
}

describe('Test DummyToken', () => {
  const dummyToken = new DummyToken({})
  testTokenClasses(dummyToken)
})

describe('Test LocalStorageToken', () => {
  const localStorageToken = new LocalStorageToken({})
  testTokenClasses(localStorageToken)
})

describe('Test CookieToken', () => {
  const cookieToken = new CookieToken({})
  testTokenClasses(cookieToken)
})
