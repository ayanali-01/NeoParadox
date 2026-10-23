import {configureStore} from "@reduxjs/toolkit"
import authreducer from "../features/auth/state/auth.slice.js"
import productreducer from "../features/products/state/product.slice.js"

export const store = configureStore({
    reducer:{
        auth:authreducer,
        product:productreducer
    }
})