import React, { useEffect, useState } from 'react'
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
            return <React.Fragment>{children}</React.Fragment>
          }
        } else if (auth.hasToRefreshAccessToken()) {
          return (
            <AsyncComponent promise={auth.refreshToken()}>
              <React.Fragment>
                {render ? (
                  render(renderProps)
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
}
const AsyncComponent: React.FunctionComponent<AsyncComponentProps> = (
  props: AsyncComponentProps
) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    props.promise.finally(() => setIsLoading(false))
  }, [props.promise])

  if (isLoading) return <React.Fragment />
  else return <React.Fragment>{props.children}</React.Fragment>
}

export default PrivateRoute
