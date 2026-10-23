import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: "product",
    initialState: {
        sellerProducts: [],
        products: []
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerProducts = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
        removeProduct: (state, action) => {
            state.sellerProducts = state.sellerProducts.filter(product => product._id !== action.payload)
            state.products = state.products.filter(product => product._id !== action.payload)
        }
    }
})


export const { setSellerProducts, setProducts, removeProduct } = productSlice.actions
export default productSlice.reducer