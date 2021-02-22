import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useAuthContext } from './AuthContext'
import RefreshComponent from './RefreshComponent'

/**
 * @interface PrivateRouteProps
 * @param {string} loginPath The Login route where redirect if not authenticated
 */
interface PrivateRouteProps {
  /**
   * The Login route where redirect if not authenticated
   */
  loginPath: string
}

/**
 * PrivateRoute Component
 * @param {PrivateRouteProps & RouteProps} props
 */
function PrivateRoute(props: PrivateRouteProps & RouteProps) {
  return (
    <RefreshComponent>
      <InnerPrivateRoute {...props} />
    </RefreshComponent>
  )
}

function InnerPrivateRoute(props: PrivateRouteProps & RouteProps) {
  const [authCtx] = useAuthContext()

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

  console.debug(
    'InnerPrivateRoute',
    authCtx.isAuthenticated() && !authCtx.hasToRefreshAccessToken()
  )

  if (authCtx.isAuthenticated() && !authCtx.hasToRefreshAccessToken()) {
    return (
      <Route
        location={location}
        path={path}
        exact={exact}
        sensitive={sensitive}
        strict={strict}
        render={(renderProps) => {
          if (component) {
            return (
              <React.Fragment>
                {/* @ts-ignore */}
                {React.createElement(component, renderProps)}
              </React.Fragment>
            )
          } else if (render) {
            return <React.Fragment>{render(renderProps)}</React.Fragment>
          }
          return <React.Fragment>{children}</React.Fragment>
        }}
      />
    )
  } else {
    return <Redirect to={loginPath} />
  }
}

export default PrivateRoute
