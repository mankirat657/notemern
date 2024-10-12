import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import App from './App.jsx';
import Home from './pages/home/home.jsx';
import './index.css';
import Login from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';
import { UserProvider } from './UserContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/signUp" replace={true} />, 
      },
      {
        path: "/dashboard",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <Signup />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider >
    <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
