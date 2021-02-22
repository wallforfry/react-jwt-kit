import React from 'react'
import { Async } from 'react-async'
import { useAuthContext } from './AuthContext'
import useAuth from '../hooks/useAuth'

interface RefreshComponentProps {
  children: React.ReactNode
}
function RefreshComponent({ children }: RefreshComponentProps) {
  const [token] = useAuthContext()
  const auth = useAuth()

  const hasToRefresh =
    token.hasToRefreshAccessToken() && !token.isAuthenticated()

  console.debug('Refresh Component', hasToRefresh)

  if (hasToRefresh) {
    return (
      <Async promiseFn={async () => auth.refreshToken()}>
        {({ data, error, isPending }) => {
          if (isPending) return <React.Fragment>Loading</React.Fragment>
          if (error) return <React.Fragment>Error</React.Fragment>
          if (data) return <React.Fragment>{children}</React.Fragment>
          return null
        }}
      </Async>
    )
  }

  return <React.Fragment>{children}</React.Fragment>
}

export default RefreshComponent
