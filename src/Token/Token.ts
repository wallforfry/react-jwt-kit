/**
 * @interface TokenParamsInterface
 * @param userClaimsName The name of the user claims field in Access Token
 * @param accessTokenName The AccessToken storage name
 * @param refreshTokenName The RefreshToken storage name
 */
export interface TokenParamsInterface {
  /**
   *  The name of the user claims field in Access Token
   *  @defaultValue `user_claims`
   */
  userClaimsName?: string
  /**
   * The AccessToken storage name
   * @defaultValue `_auth_t`
   */
  accessTokenName?: string
  /**
   * The RefreshToken storage name
   * @defaultValue `_refresh_t`
   */
  refreshTokenName?: string
  /**
   * Function that return new AccessToken as Promise\<string\>
   * @returns {Promise<string>} Promise\<string\> of the new Access Token
   */
  fetchRefreshToken?: () => Promise<string>
}

/**
 * @abstract
 * @class
 * Abstract Class for Token interactions
 */
abstract class Token {
  /**
   *  The name of the user claims field in Access Token
   *  @defaultValue `user_claims`
   */
  private readonly userClaimsName: string
  /**
   * The AccessToken storage name
   * @defaultValue `_auth_t`
   */
  private readonly accessTokenName: string
  /**
   * The RefreshToken storage name
   * @defaultValue `_refresh_t`
   */
  private readonly refreshTokenName: string

  /**
   * Function that return new AccessToken as Promise\<string\>
   * @returns {Promise<string>} Promise\<string\> of the new Access Token
   */
  public readonly fetchRefreshToken: () => Promise<string>

  // @ts-ignore
  private accessToken: string | undefined
  // @ts-ignore
  private refreshToken: string | undefined

  /**
   * {@inheritdoc TokenParamsInterface}
   */
  constructor(props: TokenParamsInterface) {
    this.userClaimsName = props?.userClaimsName ?? 'user_claims'
    this.accessTokenName = props?.accessTokenName ?? '_auth_t'
    this.refreshTokenName = props?.refreshTokenName ?? '_refresh_t'
    if (!props?.fetchRefreshToken)
      throw new Error('Token require fetchRefreshToken props')
    this.fetchRefreshToken = props.fetchRefreshToken
  }

  /**
   * Set the Access Token from storage
   * @param token - AccessToken as string
   * @virtual
   */
  setAccessToken(token: string) {
    this.accessToken = token
    this._setAccessToken(token)
  }

  /**
   * Get the Access Token from storage
   * @returns {string|undefined} The stored Access Token
   */
  getAccessToken() {
    this.accessToken = this._getAccessToken()
    return this.accessToken
  }

  /**
   * Remove the Access Token from storage
   */
  unsetAccessToken() {
    this.accessToken = undefined
    this._unsetAccessToken()
  }

  /**
   * Set the Refresh Token from storage
   * @param refreshToken - RefreshToken as string
   */
  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken
    this._setRefreshToken(refreshToken)
  }

  /**
   * Get the Refresh Token from storage
   * @returns {string|undefined} The stored Refresh Token
   */
  getRefreshToken() {
    this.refreshToken = this._getRefreshToken()
    return this.refreshToken
  }

  /**
   * Remove the Refresh Token from storage
   */
  unsetRefreshToken() {
    this.refreshToken = undefined
    this._unsetRefreshToken()
  }

  /**
   * Set the Access Token from storage
   * @param token - AccessToken as string
   * @virtual
   */
  protected abstract _setAccessToken(token: string): void
  /**
   * Get the Access Token from storage
   * @returns {string|undefined} The stored Access Token
   */
  protected abstract _getAccessToken(): string | undefined
  /**
   * Remove the Access Token from storage
   */
  protected abstract _unsetAccessToken(): void

  /**
   * Set the Refresh Token from storage
   * @param refreshToken - RefreshToken as string
   */
  protected abstract _setRefreshToken(refreshToken: string): void
  /**
   * Get the Refresh Token from storage
   * @returns {string|undefined} The stored Refresh Token
   */
  protected abstract _getRefreshToken(): string | undefined
  /**
   * Remove the Refresh Token from storage
   */
  protected abstract _unsetRefreshToken(): void

  /**
   * Get the Access Token storage name
   * @returns {string} The Access Token storage name
   */
  protected getAccessTokenName(): string {
    return this.accessTokenName
  }

  /**
   * Get the Refresh Token storage name
   * @returns {string} The Refresh Token storage name
   */
  protected getRefreshTokenName(): string {
    return this.refreshTokenName
  }

  /**
   * Get the Access Token expiration
   * @returns {Date|undefined} The AccessToken expiration as Date or undefined if no AccessToken
   */
  getAccessTokenExp(): Date | undefined {
    const token = this.getAccessToken()
    if (!token) return undefined
    return this.getTokenExp(token)
  }

  /**
   * Get the Refresh Token expiration
   * @returns {Date|undefined} The RefreshToken expiration as Date or undefined if no RefreshToken
   */
  getRefreshTokenExp(): Date | undefined {
    const token = this.getRefreshToken()
    if (!token) return undefined
    return this.getTokenExp(token)
  }

  /**
   * Get user claims
   * @returns {any} The user claims stored in the AccessToken
   */
  getUserClaims(): any {
    const token = this.getAccessToken()
    if (!token) return undefined
    return this.decodeToken(token)[this.userClaimsName]
  }

  /**
   * Check if Access Token is expired
   * @returns {boolean} true if the AccessToken is expired
   */
  isAccessTokenExpired(): boolean {
    const exp = this.getAccessTokenExp()
    if (!exp) return true
    return this.dateTimeDiffInMinutes(new Date(), exp) <= 0
  }

  /**
   * Check if Refresh Token is expired
   * @returns {boolean} true if the RefreshToken is expired
   */
  isRefreshTokenExpired(): boolean {
    const exp = this.getRefreshTokenExp()
    if (!exp) return true
    return this.dateTimeDiffInMinutes(new Date(), exp) <= 0
  }

  /**
   * Check if the user is authenticated
   * @returns {boolean} true if the user is authenticated
   */
  isAuthenticated(): boolean {
    return !this.isAccessTokenExpired()
  }

  /**
   * Check if Access Token is expired but Refresh Token still valid
   * @returns {boolean} true Access Token expired and Refresh Token not
   */
  hasToRefreshAccessToken(): boolean {
    return this.isAccessTokenExpired() && !this.isRefreshTokenExpired()
  }

  /**
   * Decode JWT token and return payload
   * @param token JWT token as string
   * @returns {any} JWT token payload object
   */
  protected decodeToken(token: string): any {
    if (!token) return undefined
    return JSON.parse(atob(token.split('.')[1]))
  }

  /**
   * Get JWT token expiration as Date from `exp` field in token payload
   * @param token JWT token as string
   * @returns {Date|undefined} The JWT token expiration as Date or undefined if no token
   */
  protected getTokenExp(token: string): Date | undefined {
    if (!token) return undefined
    return new Date(this.decodeToken(token).exp * 1000)
  }

  /**
   * @param date1 First date
   * @param date2 Second date
   * @returns The diff in minutes between date1 and date2
   */
  private dateTimeDiffInMinutes(date1: Date, date2: Date): number {
    if (date1 > date2)
      return Math.round((date1.getTime() - date2.getTime()) / 1000 / 60)
    return Math.round((date2.getTime() - date1.getTime()) / 1000 / 60)
  }
}

export default Token
