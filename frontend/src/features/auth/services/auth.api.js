import axios from "axios"


const authapi = axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})



export async function register({email,fullname,contact,password,isSeller}){

        const response = await authapi.post("/register",{
            email,fullname,contact,password,isSeller
        })

        return response.data

}

export async function login({ email, password }) {
    const response = await authapi.post("/login", {
        email,
        password
    })

    return response.data
}



export async function getMe() {
    const response = await authapi.get("/me")

    return response.data
}
