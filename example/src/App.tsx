import React from 'react'

import { CookieToken, AuthProvider } from 'react-jwt-kit'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'

const handleRefreshToken = (): Promise<string> => {
  return fetch('http://localhost:5000/api/v1/auth/refresh', {
    method: 'POST',
    credentials: 'include'
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((data) => {
        return data.accessToken
      })
    }
    return undefined
  })
}

const token = new CookieToken({ fetchRefreshToken: () => handleRefreshToken() })

const App = () => {
  return (
    <AuthProvider token={token}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
