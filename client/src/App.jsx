import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import RestauDetailPage from "./routes/RestauDetailPage";
import RestauUpdatePage from "./routes/RestauUpdatePage";
import ErrorPage from "./routes/error-page";
import { RestauContextProvider } from "./context/RestauContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/restaurants/:id/update",
      element: <RestauUpdatePage />,
    },
    {
      path: "/restaurants/:id",
      element: <RestauDetailPage />,
    },
    {
      path: "/error",
      element: <ErrorPage />,
    },
  ]);

  return (
    <RestauContextProvider>
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </RestauContextProvider>
  );
}

export default App;
