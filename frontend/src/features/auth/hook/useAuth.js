import { seterror, setloading, setuser } from "../state/auth.slice.js";
import { register, login } from "../services/auth.api.js";
import { useDispatch } from "react-redux"

export const useAuth = () => {

    const dispatch = useDispatch()

    async function handleRegister({ email, password, fullname, contact }) {
        const data = await register({ email, password, fullname, contact })
        dispatch(setuser(data.user))
        return data.user
    }

    async function handleLogin({ email, password }) {
        const data = await login({ email, password })
        dispatch(setuser(data.user))
        return data.user
    }

    return { handleRegister, handleLogin }
}