import React, { useEffect } from 'react'
import useAuth from '../hooks/useAuth'

interface RefreshComponentParams {
  fetchRefreshToken: () => Promise<string>
}

const RefreshComponent: React.FunctionComponent<RefreshComponentParams> = (
  props: RefreshComponentParams
) => {
  const auth = useAuth()
  useEffect(() => {
    if (auth.hasToRefreshAccessToken()) {
      props.fetchRefreshToken().then((accessToken: string) => {
        auth.setAccessToken(accessToken)
      })
    }
  }, [auth])
  return <React.Fragment />
}

export default RefreshComponent
