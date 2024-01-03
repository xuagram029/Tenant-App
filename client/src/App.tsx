import { useState } from 'react'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import UserSignup from './pages/UserSignup';
import ErrorPage from './pages/ErrorPage';
import UserLogin from './pages/UserLogin';
import UserPage from './pages/UserPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/user-login",
      element: <UserLogin />,
    },
    {
      path: "/user-signup",
      element: <UserSignup />,
    },
    {
      path: "/user-home",
      element: <UserPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return (
    <div className='h-screen scroll-smooth m-0 p-0 box-border relative font-body'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
