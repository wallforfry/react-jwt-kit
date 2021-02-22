import useAuth from './hooks/useAuth'
import useToken from './hooks/useToken'
import Token from './Token/Token'
import CookieToken from './Token/CookieToken'
import LocalStorageToken from './Token/LocalStorageToken'
import AuthProvider from './components/AuthProvider'
import PrivateRoute from './components/PrivateRoute'

// Hide console debug if not on localhost
if (window.location.hostname !== 'localhost') {
  console.debug = function () {}
}

export {
  useAuth,
  useToken,
  Token,
  CookieToken,
  LocalStorageToken,
  AuthProvider,
  PrivateRoute
}
