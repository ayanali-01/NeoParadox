import { createBrowserRouter } from "react-router-dom"
import Register from "../features/auth/pages/register"
import Login from "../features/auth/pages/login"

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
    }
])