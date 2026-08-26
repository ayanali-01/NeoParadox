import {configureStore} from "@reduxjs/toolkit"
import authreducer from "../features/auth/state/auth.slice.js"


export const store = configureStore({
    reducer:{
        auth:authreducer
    }
})