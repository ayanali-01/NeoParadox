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
            user.state = action.payload
        },
        setloading:(state,action) =>{
            user.state = action.payload
        },
        seterror:(state,action) =>{
            user.state = action.payload
        }
    }
})


export const {seterror,setloading,setuser} = authslice.actions
export default authslice.reducer