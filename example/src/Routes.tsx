import React from 'react'
import { BrowserRouter, Link, Route, useHistory } from 'react-router-dom'
import { PrivateRoute, useAuth, useToken } from 'react-jwt-kit'

const handleLogin = (auth: any): Promise<void> => {
  return new Promise<void>((resolve) =>
    fetch('http://localhost:5000/api/v1/auth/login', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        username: 'wallerand@delevacq.fr',
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

const LoginButton = () => {
  const history = useHistory()
  const auth = useAuth()
  return (
    <button
      onClick={() => handleLogin(auth).then(() => history.push('/private'))}
    >
      Login
    </button>
  )
}

const PrivateView = () => {
  const auth = useAuth()
  const token = useToken()

  return (
    <>
      Private Route
      <div>
        <button onClick={() => auth.signOut()}>Logout</button>
        <button
          onClick={() =>
            handleRefreshToken().then((accessToken) =>
              auth.setAccessToken(accessToken)
            )
          }
        >
          Refresh
        </button>
        <p>isAccessTokenExpired : {token.isAccessTokenExpired().toString()}</p>
        <p>
          isRefreshTokenExpired : {token.isRefreshTokenExpired().toString()}
        </p>
        <p>isAuthenticated : {auth.isAuthenticated().toString()}</p>
        <p>
          hasToRefreshAccessToken : {auth.hasToRefreshAccessToken().toString()}
        </p>
        {auth.isAuthenticated() && (
          <p>UserClaims : {JSON.stringify(token.getUserClaims())}</p>
        )}
      </div>
    </>
  )
}

export default function Routes() {
  return (
    <BrowserRouter>
      <div>
        <Link to='/login'>Login</Link> <Link to='/'>Home</Link>{' '}
        <Link to='/private'>Private</Link>
      </div>

      <Route path='/' exact>
        Public Route
      </Route>
      <Route path='/login'>
        <LoginButton />
      </Route>
      <PrivateRoute loginPath='/login' path='/private' exact>
        <PrivateView />
      </PrivateRoute>
    </BrowserRouter>
  )
}
