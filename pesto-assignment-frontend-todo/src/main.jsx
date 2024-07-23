import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import ErrorPage from './error-page.jsx';
import Root from './routes/root.jsx';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';

import { AuthProvider } from './context/AuthContext.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement:<ErrorPage />
  },
  {
    path:'register',
    element:<Register/>,
    errorElement:<ErrorPage/>
  },
  {
    path:'login',
    element:<Login/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <AuthProvider>
    <RouterProvider  router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
