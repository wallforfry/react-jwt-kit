import Cookies from 'js-cookie'
import Token, { TokenParamsInterface } from './Token'

export interface CookieTokenParamsInterface extends TokenParamsInterface {
  cookieDomain?: string
  cookieSecure?: boolean
}

class CookieToken extends Token {
  private readonly cookieDomain?: string
  private readonly cookieSecure?: boolean

  constructor(props: CookieTokenParamsInterface) {
    super(props)
    this.cookieDomain = props.cookieDomain ?? window.location.hostname
    this.cookieSecure =
      props.cookieSecure ?? window.location.protocol === 'https:'
  }

  setAccessToken(token: string): void {
    Cookies.set(this.getAccessTokenName(), token, {
      expires: this.getTokenExp(token),
      domain: this.cookieDomain,
      secure: false
    })
  }

  getAccessToken(): string | undefined {
    return Cookies.get(this.getAccessTokenName())
  }

  unsetAccessToken(): void {
    Cookies.remove(this.getAccessTokenName(), {
      domain: this.cookieDomain,
      secure: false
    })
  }

  setRefreshToken(refreshToken: string): void {
    Cookies.set(this.getRefreshTokenName(), refreshToken, {
      expires: this.getTokenExp(refreshToken),
      domain: this.cookieDomain,
      secure: this.cookieSecure
    })
  }

  getRefreshToken(): string | undefined {
    return Cookies.get(this.getRefreshTokenName())
  }

  unsetRefreshToken(): void {
    Cookies.remove(this.getRefreshTokenName(), {
      domain: this.cookieDomain,
      secure: this.cookieSecure
    })
  }
}

export default CookieToken
