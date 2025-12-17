import React from 'react'
import Home from './Components/Home'
import Shop from './Components/Shop'
import About from './Components/About'
import Contact from './Components/Contact'
import Login from './Components/LoginPage'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path:'/',

    element: <div>
      <Home/>
    </div> 
  },
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:'/about',
    element: <About/>
  },
  {
    path:'/shop',
    element: <Shop/>
  },
  {
    path:'/contact',
    element: <Contact/>
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
