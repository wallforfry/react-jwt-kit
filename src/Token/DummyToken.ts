import Token from './Token'

export default class DummyToken extends Token {
  _accessToken: undefined | string
  _refreshToken: undefined | string

  setAccessToken(token: string): void {
    this._accessToken = token
  }

  getAccessToken(): string | undefined {
    return this._accessToken
  }

  unsetAccessToken(): void {
    this._accessToken = undefined
  }

  setRefreshToken(refreshToken: string): void {
    this._refreshToken = refreshToken
  }

  getRefreshToken(): string | undefined {
    return this._refreshToken
  }

  unsetRefreshToken(): void {
    this._refreshToken = undefined
  }
}
