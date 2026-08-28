import { createSlice } from "@reduxjs/toolkit";


const authslice = createSlice({
    name: "auth",
    initialState:{
        user:null,
        loading:null,
        error:null
    },

    reducers:{
        setuser:(state,action) =>{
            state.user = action.payload
        },
        setloading:(state,action) =>{
            state.loading = action.payload
        },
        seterror:(state,action) =>{
            state.error = action.payload
        }
    }
})


export const {seterror,setloading,setuser} = authslice.actions
export default authslice.reducer