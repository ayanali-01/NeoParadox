import { config } from "dotenv";

config()


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

export const Config = {
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET :process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID :process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET :process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL :process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/api/auth/google/callback"
}