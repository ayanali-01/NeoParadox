import { config } from "dotenv";

config()

const FRONTEND_URL = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/+$/, "")
const BACKEND_URL = (process.env.BACKEND_URL || "http://localhost:3000").replace(/\/+$/, "")

    if(!process.env.MONGO_URI){
        throw new Error("uri is not in enviroment-variable")
    }

    if(!process.env.JWT_SECRET){
        throw new Error("jwt is not in enviroment-variable")
    }

     if(!process.env.GOOGLE_CLIENT_ID){
        throw new Error("google client id is not in enviroment-variable")
    }

    if(!process.env.GOOGLE_CLIENT_SECRET){
        throw new Error("google client secret is not in enviroment-variable")
    }
    if( !process.env.RAZORPAY_KEY_ID){
          throw new Error("not found razorpayid on env")  
    }

export const Config = {
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET :process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID :process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET :process.env.GOOGLE_CLIENT_SECRET,
    FRONTEND_URL,
    BACKEND_URL,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL
        || `${BACKEND_URL}/api/auth/google/callback`,
     RAZORPAY_KEY_ID : process.env.RAZORPAY_KEY_ID,
     RAZORPAY_KEY_SECRET:process.env.RAZORPAY_KEY_SECRET

}