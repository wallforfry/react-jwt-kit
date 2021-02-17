import Token from './Token'

/**
 * @class
 * LocalStorageToken implementation
 */
class LocalStorageToken extends Token {
  /**
   * Set the Access Token from storage
   * @param token - AccessToken as string
   */
  setAccessToken(token: string): void {
    localStorage.setItem(this.getAccessTokenName(), token)
  }

  /**
   * Get the Access Token from storage
   * @returns {string|undefined} The stored Access Token
   */
  getAccessToken(): string | undefined {
    return localStorage.getItem(this.getAccessTokenName()) ?? undefined
  }

  /**
   * Remove the Access Token from storage
   */
  unsetAccessToken(): void {
    localStorage.removeItem(this.getAccessTokenName())
  }

  /**
   * Set the Refresh Token from storage
   * @param refreshToken - RefreshToken as string
   */
  setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.getRefreshTokenName(), refreshToken)
  }

  /**
   * Get the Refresh Token from storage
   * @returns {string|undefined} The stored Refresh Token
   */
  getRefreshToken(): string | undefined {
    return localStorage.getItem(this.getRefreshTokenName()) ?? undefined
  }

  /**
   * Remove the Refresh Token from storage
   */
  unsetRefreshToken(): void {
    localStorage.removeItem(this.getRefreshTokenName())
  }
}

export default LocalStorageToken
