import React from 'react'
import { RouterProvider } from "react-router"
import { routes } from './app.route'
import { useEffect } from 'react'
import { useAuth } from '../features/auth/hook/useAuth.js'
import { useCart } from '../features/cart/hook/useCart.js'
import { useSelector } from 'react-redux'

const App = () => {
  const { handleGetMe } = useAuth()
  const { handleGetCart } = useCart()
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    handleGetMe()
  }, [])

  useEffect(() => {
    if (user?._id) {
      handleGetCart().catch(() => {})
    }
  }, [user?._id])

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App