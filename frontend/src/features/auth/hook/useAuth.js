import { seterror, setloading, setuser } from "../state/auth.slice.js";
import { register, login, getMe } from "../services/auth.api.js";
import { useDispatch } from "react-redux"

export const useAuth = () => {

    const dispatch = useDispatch()

    async function handleRegister({ email, password, fullname, contact, isSeller }) {
        const data = await register({ email, password, fullname, contact, isSeller })
        dispatch(setuser(data.user))
        return data.user
    }

    async function handleLogin({ email, password }) {
        const data = await login({ email, password })
        dispatch(setuser(data.user))
        return data.user
    }


     async function handleGetMe() {
        try {
            dispatch(setloading(true))
            const data = await getMe()
            dispatch(setuser(data.user))
        } catch (err) {
            dispatch(setuser(null))
            console.log(err)
        } finally {
            dispatch(setloading(false))
        }
    }
    
    
    return { handleRegister, handleLogin,handleGetMe }
}