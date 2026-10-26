import { createBrowserRouter } from "react-router-dom"
import Register from "../features/auth/pages/register"
import Login from "../features/auth/pages/login"
import CreateProduct from "../features/products/pages/CreateProduct"
import Dashboard from "../features/products/pages/Dashboard"
import Home from "../features/products/pages/Home"
import Productdetails from "../features/products/pages/Productdetails"
import SellerProductDetails from "../features/products/pages/SellerProductDetails"
import Cart from "../features/cart/pages/Cart"
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
        path: "/product/:productId",
        element: (
            <Protected>
                <Productdetails />
            </Protected>
        )
    },
    {
        path: "/cart",
        element: (
            <Protected>
                <Cart />
            </Protected>
        )
    },
    {
        path: "/seller",
        children: [
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
            },
            {
                path: "product/:productId",
                element: <Protected role="seller">
                    <SellerProductDetails />
                </Protected>
            }
        ]
    }
])
