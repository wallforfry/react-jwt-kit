import React, { useEffect, useState } from 'react'

// TODO: redirect to login path in case of promise error
interface AsyncComponentProps {
  promise: Promise<any>
  children: React.ReactNode
  loaderComponent?: React.ReactNode
  errorComponent?: React.ReactNode
}
function AsyncComponent(props: AsyncComponentProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    props.promise
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false))
  }, [props.promise])

  if (hasError)
    return (
      <React.Fragment>
        {props.errorComponent ?? 'Error loading AsyncComponent'}
      </React.Fragment>
    )
  else if (isLoading)
    return <React.Fragment>{props.loaderComponent ?? null}</React.Fragment>

  return <React.Fragment>{props.children}</React.Fragment>
}

export default AsyncComponent
