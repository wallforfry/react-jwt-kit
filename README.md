# react-jwt-kit

> Easily handle JWT auth in React app

[![NPM](https://img.shields.io/npm/v/react-jwt-kit.svg)](https://www.npmjs.com/package/react-jwt-kit) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-jwt-kit
yarn add react-jwt-kit
```

## Usage

```tsx
import React, { Component } from 'react'
import { AuthProvider, CookieToken } from 'react-jwt-kit'

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

function App() {
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
```

## License

GPL-3.0 © [wallforfry](https://github.com/wallforfry)
