import Token from './Token'

export default class DummyToken extends Token {
  _accessToken: undefined | string
  _refreshToken: undefined | string

  _setAccessToken(token: string): void {
    this._accessToken = token
  }

  _getAccessToken(): string | undefined {
    return this._accessToken
  }

  _unsetAccessToken(): void {
    this._accessToken = undefined
  }

  _setRefreshToken(refreshToken: string): void {
    this._refreshToken = refreshToken
  }

  _getRefreshToken(): string | undefined {
    return this._refreshToken
  }

  _unsetRefreshToken(): void {
    this._refreshToken = undefined
  }
}
