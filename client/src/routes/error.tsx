import { useRouteError, isRouteErrorResponse } from "react-router-dom"

export function RootErrorBoundary() {
  const error = useRouteError() as Error
  return (
    <div>
      <h1>Uh oh, something went terribly wrong 😩</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => (window.location.href = "/")}>
        Click here to reload the app
      </button>
    </div>
  )
}

export function ErrorWatch() {
  const error = useRouteError()

  if (!isRouteErrorResponse(error) || error.status !== 401) {
    throw error
  }

  return (
    <>
      <h1>You do not have access to this project</h1>
      <p>Please reach out to to obtain access.</p>
    </>
  )
}

export default RootErrorBoundary
