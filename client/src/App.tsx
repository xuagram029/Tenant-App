import { useState } from 'react'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import UserSignup from './pages/UserSignup';
import ErrorPage from './pages/ErrorPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/user-signup",
      element: <UserSignup />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
