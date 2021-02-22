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
import { AuthProvider, CookieToken, useAuth, PrivateRoute } from 'react-jwt-kit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

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

const handleLogin = (auth: any): Promise<void> => {
  return new Promise<void>((resolve) =>
    fetch('http://localhost:5000/api/v1/auth/login', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        username: 'username',
        password: 'password'
      })
    }).then((response) => {
      response.json().then((data) => {
        auth.signIn({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken
        })
        resolve()
      })
    })
  )
}

const token = new CookieToken({ fetchRefreshToken: () => handleRefreshToken() })

function App() {
  return (
    <AuthProvider token={token}>
      <BrowserRouter>
        <Switch>
          <Route path='/login'>
            <LoginButton />
          </Route>
          <PrivateRoute path='/private' loginPath='/login'>
            Private
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  )
}

const LoginButton = () => {
  const history = useHistory()
  const auth = useAuth()
  return (
    <>
      <button
        onClick={() => handleLogin(auth).then(() => history.push('/private'))}
      >
        Login
      </button>
      <button onClick={() => auth.signOut()}>Logout</button>
    </>
  )
}
```

## License

GPL-3.0 © [wallforfry](https://github.com/wallforfry)
