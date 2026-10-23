import { createBrowserRouter } from "react-router-dom"
import Register from "../features/auth/pages/register"
import Login from "../features/auth/pages/login"
import CreateProduct from "../features/products/pages/CreateProduct"
import Dashboard from "../features/products/pages/Dashboard"

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <h1>hello world</h1>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
   {
    path : "/seller",
    children :[
         {
        path: "create-product",
        element: <CreateProduct />
    },
    {
        path: "dashboard",
        element: <Dashboard />
    }
    ]
   }

])
