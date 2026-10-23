import { createBrowserRouter } from "react-router-dom"
import Register from "../features/auth/pages/register"
import Login from "../features/auth/pages/login"
import CreateProduct from "../features/products/pages/CreateProduct"
import Dashboard from "../features/products/pages/Dashboard"
import Home from "../features/products/pages/Home"
import Protected from "../features/auth/components/protected"

export const routes = createBrowserRouter([
    {
        path: "/",
        element: (
            <Protected>
                <Home />
            </Protected>
        )
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
        element: <Protected role="seller">
            <CreateProduct />
        </Protected>
    },
    {
        path: "dashboard",
        element: <Protected role="seller">
            <Dashboard />
        </Protected>
    }
    ]
   }

])
