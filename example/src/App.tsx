import React from 'react'

import { AuthProvider, CookieToken } from 'react-jwt-kit'
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
const App = () => {
  return (
    <AuthProvider
      fetchRefreshToken={() => handleRefreshToken()}
      tokenGenerator={() =>
        new CookieToken({
          cookieDomain: window.location.hostname,
          cookieSecure: window.location.protocol === 'https:'
        })
      }
    >
      <Routes />
    </AuthProvider>
  )
}

export default App
