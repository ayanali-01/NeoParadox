import React from 'react'
import {RouterProvider} from "react-router"
import { routes } from './app.route'



const App = () => {
  return (
     <>
      <RouterProvider router = {routes} />
     </>
  )
}

export default App