import { useState } from 'react'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import UserSignup from './pages/UserSignup';
import ErrorPage from './pages/ErrorPage';
import UserLogin from './pages/UserLogin';
import UserPage from './pages/UserPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminSignup from './pages/AdminSignup';

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
      path: "/admin-login",
      element: <AdminLogin />,
    },
    {
      path: "/admin-signup",
      element: <AdminSignup />,
    },
    {
      path: "/admin-dashboard",
      element: <AdminDashboard />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return (
    <div className='h-screen scroll-smooth m-0 p-0 box-border relative font-body text-[#1f1f1f]'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
