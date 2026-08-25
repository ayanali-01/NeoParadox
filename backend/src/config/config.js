import { config } from "dotenv";

config()


    if(!process.env.MONGO_URI){
        throw new Error("uri is not in enviroment-variable")
    }

    if(!process.env.JWT_SECRET){
        throw new Error("jwt is not in enviroment-variable")
    }

export const Config = {
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET :process.env.JWT_SECRET
}