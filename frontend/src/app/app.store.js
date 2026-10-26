import { configureStore } from "@reduxjs/toolkit"
import authreducer from "../features/auth/state/auth.slice.js"
import productreducer from "../features/products/state/product.slice.js"
import cartreducer from "../features/cart/state/cart.slice.js"

export const store = configureStore({
    reducer: {
        auth: authreducer,
        product: productreducer,
        cart: cartreducer
    }
})