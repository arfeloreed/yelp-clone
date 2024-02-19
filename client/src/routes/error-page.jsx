import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      {/* {error && (
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      )} */}
      {error ? (
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      ) : (
        <p>Page not found.</p>
      )}
    </div>
  );
}

export default ErrorPage;
