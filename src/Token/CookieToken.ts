import Cookies from 'js-cookie'
import Token, { TokenParamsInterface } from './Token'

/**
 * @interface CookieTokenParamsInterface
 * @param cookieDomain The cookie specific domain
 * @param cookieSecure Is the cookie secured
 */
export interface CookieTokenParamsInterface extends TokenParamsInterface {
  /**
   *  The cookie specific domain
   *  @defaultValue `window.location.hostname`
   */
  cookieDomain?: string
  /**
   *  Is the cookie secured
   *  @defaultValue `window.location.protocol === 'https:'`
   */
  cookieSecure?: boolean
}

/**
 * @class
 * CookieToken implementation
 */
class CookieToken extends Token {
  private readonly cookieDomain?: string
  private readonly cookieSecure?: boolean

  constructor(props: CookieTokenParamsInterface) {
    super(props)
    this.cookieDomain = props.cookieDomain ?? window.location.hostname
    this.cookieSecure =
      props.cookieSecure ?? window.location.protocol === 'https:'
  }

  /**
   * Set the Access Token from storage
   * @param token - AccessToken as string
   */
  setAccessToken(token: string): void {
    Cookies.set(this.getAccessTokenName(), token, {
      expires: this.getTokenExp(token),
      domain: this.cookieDomain,
      secure: false
    })
  }

  /**
   * Get the Access Token from storage
   * @returns {string|undefined} The stored Access Token
   */
  getAccessToken(): string | undefined {
    return Cookies.get(this.getAccessTokenName())
  }

  /**
   * Remove the Access Token from storage
   */
  unsetAccessToken(): void {
    Cookies.remove(this.getAccessTokenName(), {
      domain: this.cookieDomain,
      secure: false
    })
  }

  /**
   * Set the Refresh Token from storage
   * @param refreshToken - RefreshToken as string
   */
  setRefreshToken(refreshToken: string): void {
    Cookies.set(this.getRefreshTokenName(), refreshToken, {
      expires: this.getTokenExp(refreshToken),
      domain: this.cookieDomain,
      secure: this.cookieSecure
    })
  }

  /**
   * Get the Refresh Token from storage
   * @returns {string|undefined} The stored Refresh Token
   */
  getRefreshToken(): string | undefined {
    return Cookies.get(this.getRefreshTokenName())
  }

  /**
   * Remove the Refresh Token from storage
   */
  unsetRefreshToken(): void {
    Cookies.remove(this.getRefreshTokenName(), {
      domain: this.cookieDomain,
      secure: this.cookieSecure
    })
  }
}

export default CookieToken
