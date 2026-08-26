import { seterror,setloading,setuser } from "../state/auth.slice.js";
import { register } from "../services/auth.api.js";
import {useDispatch} from "react-redux"




export const useAuth = () =>{

    const dispatch = useDispatch()


    async function handleregister({email,password,fullname,contact}){
        const data = register({email,password,fullname,contact})

        dispatch(setuser(data.user))

        return data.user

    }
}