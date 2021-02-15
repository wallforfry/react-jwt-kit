import Token from './Token'

class LocalStorageToken extends Token {
  setAccessToken(token: string): void {
    localStorage.setItem(this.getAccessTokenName(), token)
  }

  getAccessToken(): string | undefined {
    return localStorage.getItem(this.getAccessTokenName()) ?? undefined
  }

  unsetAccessToken(): void {
    localStorage.removeItem(this.getAccessTokenName())
  }

  setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.getRefreshTokenName(), refreshToken)
  }

  getRefreshToken(): string | undefined {
    return localStorage.getItem(this.getRefreshTokenName()) ?? undefined
  }

  unsetRefreshToken(): void {
    localStorage.removeItem(this.getRefreshTokenName())
  }
}

export default LocalStorageToken
