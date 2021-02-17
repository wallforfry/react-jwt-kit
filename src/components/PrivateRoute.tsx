import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

interface PrivateRouteProps {
  loginPath: string
}

const PrivateRoute: React.FunctionComponent<PrivateRouteProps & RouteProps> = (
  props: PrivateRouteProps & RouteProps
) => {
  const auth = useAuth()

  const {
    component,
    loginPath,
    strict,
    sensitive,
    exact,
    path,
    location,
    children,
    render
  } = props

  return (
    <Route
      location={location}
      path={path}
      exact={exact}
      sensitive={sensitive}
      strict={strict}
      component={auth.isAuthenticated() ? component : undefined}
      render={(renderProps) => {
        if (auth.isAuthenticated()) {
          if (render) {
            return render(renderProps)
          } else {
            return children
          }
        } else {
          return <Redirect to={loginPath} from='test' />
          // Le fetchRefreshToken doit être set dans AuthProvider pour être appelé ici
        }
      }}
    />
  )
}

export default PrivateRoute