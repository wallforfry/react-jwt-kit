import React, { useEffect, useState } from 'react'

// TODO: redirect to login path in case of promise error
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

export default AsyncComponent
