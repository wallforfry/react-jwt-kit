import React from 'react'
import { Link, Route, Switch, useHistory } from 'react-router-dom'
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
      <button onClick={() => auth.refreshToken()}>Refresh</button>
      <button onClick={() => auth.getUserClaims()}>Sync</button>
    </>
  )
}

function PrivateView() {
  const token = useToken()
  const history = useHistory()

  const isAuthenticated = token.isAuthenticated()

  const isAccessTokenExpired = token.isAccessTokenExpired()

  const isRefreshTokenExpired = token.isRefreshTokenExpired()

  const hasToRefreshAccessToken = token.hasToRefreshAccessToken()

  const userClaims = token.getUserClaims()

  return (
    <>
      Private Route : {history.location.pathname}
      <div>
        <p>isAccessTokenExpired : {isAccessTokenExpired.toString()}</p>
        <p>isRefreshTokenExpired : {isRefreshTokenExpired.toString()}</p>
        <p>isAuthenticated : {isAuthenticated.toString()}</p>
        <p>hasToRefreshAccessToken : {hasToRefreshAccessToken.toString()}</p>
        {isAuthenticated && <p>UserClaims : {JSON.stringify(userClaims)}</p>}
      </div>
    </>
  )
}

export default function Routes() {
  const token = useToken()

  return (
    <>
      <div>
        <Link to='/login'>Login</Link> <Link to='/'>Home</Link>{' '}
        <Link to='/private'>Private</Link>{' '}
        <Link to='/private-component'>Private-Component</Link>{' '}
        <Link to='/private-render'>Private-Render</Link>
        <br />
        <LoginButton />
        <br />
        <p>accessToken : {(token.getAccessToken() !== undefined).toString()}</p>
        <p>
          refreshToken : {(token.getRefreshToken() !== undefined).toString()}
        </p>
        <button onClick={() => console.debug(token.getAccessToken())}>
          Test
        </button>
        <br />
      </div>

      <Switch>
        <Route path='/' exact>
          Public Route
        </Route>
        <Route path='/login'>
          <LoginButton />
        </Route>
        <PrivateRoute loginPath='/login' path='/private' exact>
          <PrivateView />
        </PrivateRoute>
        <PrivateRoute
          loginPath='/login'
          path='/private-component'
          exact
          component={PrivateView}
        />
        <PrivateRoute
          loginPath='/login'
          path='/private-render'
          exact
          render={() => <PrivateView />}
        />
      </Switch>
    </>
  )
}
