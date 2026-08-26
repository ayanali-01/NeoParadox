import axios from "axios"


const authapi = axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})



export async function  register({email,fullname,contact,password}){

        const response = await authapi.post("/register",{
            email,fullname,contact,password
        })

        return response.data

}



