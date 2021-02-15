export interface TokenParamsInterface {
  accessTokenName?: string
  accessTokenExpName?: string
  refreshTokenName?: string
  refreshTokenExpName?: string
}

abstract class Token {
  private readonly accessTokenName: string
  private readonly refreshTokenName: string

  constructor(props: TokenParamsInterface) {
    this.accessTokenName = props?.accessTokenName ?? '_auth_t'
    this.refreshTokenName = props?.refreshTokenName ?? '_refresh_t'
  }

  abstract setAccessToken(token: string): void
  abstract getAccessToken(): string | undefined
  abstract unsetAccessToken(): void

  abstract setRefreshToken(refreshToken: string): void
  abstract getRefreshToken(): string | undefined
  abstract unsetRefreshToken(): void

  protected getAccessTokenName(): string {
    return this.accessTokenName
  }

  protected getRefreshTokenName(): string {
    return this.refreshTokenName
  }

  getAccessTokenExp(): Date | undefined {
    const token = this.getAccessToken()
    if (!token) return undefined
    return this.getTokenExp(token)
  }

  getRefreshTokenExp(): Date | undefined {
    const token = this.getRefreshToken()
    if (!token) return undefined
    return this.getTokenExp(token)
  }

  getUserClaims(): any {
    const token = this.getAccessToken()
    if (!token) return undefined
    return this.decodeToken(token)
  }

  isAccessTokenExpired(): boolean {
    const exp = this.getAccessTokenExp()
    if (!exp) return true
    return this.dateTimeDiffInMinutes(new Date(), exp) <= 0
  }

  isRefreshTokenExpired(): boolean {
    const exp = this.getRefreshTokenExp()
    if (!exp) return true
    return this.dateTimeDiffInMinutes(new Date(), exp) <= 0
  }

  protected decodeToken(token: string): any {
    if (!token) return undefined
    return JSON.parse(atob(token.split('.')[1]))
  }

  getTokenExp(token: string): Date | undefined {
    if (!token) return undefined
    return new Date(this.decodeToken(token).exp * 1000)
  }

  private dateTimeDiffInMinutes(date1: Date, date2: Date): number {
    if (date1 > date2)
      return Math.round((date1.getTime() - date2.getTime()) / 1000 / 60)
    return Math.round((date2.getTime() - date1.getTime()) / 1000 / 60)
  }

  protected getTokenExpirationInMinutes(token: string) {
    return this.dateTimeDiffInMinutes(
      new Date(),
      new Date(this.decodeToken(token).exp * 1000)
    )
  }
}

export default Token
