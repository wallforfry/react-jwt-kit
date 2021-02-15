import React from 'react'
import Token from './Token/Token'

export interface AuthContextInterface {
  token: Token
}

export interface AuthProviderProps {
  children: React.ReactNode
  tokenGenerator?: () => Token
}
