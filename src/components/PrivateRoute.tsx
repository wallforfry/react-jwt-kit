import React, { useEffect, useState } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

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
      render={(renderProps) => {
        if (auth.isAuthenticated()) {
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
        } else if (auth.hasToRefreshAccessToken()) {
          return (
            <AsyncComponent promise={auth.refreshToken()}>
              <React.Fragment>
                {component ? (
                  <React.Fragment>
                    {/* @ts-ignore */}
                    {React.createElement(component, renderProps)}
                  </React.Fragment>
                ) : render ? (
                  <React.Fragment>{render(renderProps)}</React.Fragment>
                ) : (
                  <React.Fragment>{children}</React.Fragment>
                )}
              </React.Fragment>
            </AsyncComponent>
          )
        }
        return <Redirect to={loginPath} />
      }}
    />
  )
}

interface AsyncComponentProps {
  promise: Promise<any>
  children: React.ReactNode
  loader?: React.ReactNode
}
function AsyncComponent(props: AsyncComponentProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    props.promise.finally(() => setIsLoading(false))
  }, [props.promise])

  if (isLoading) return <React.Fragment>{props.loader ?? null}</React.Fragment>
  else return <React.Fragment>{props.children}</React.Fragment>
}

export default PrivateRoute
