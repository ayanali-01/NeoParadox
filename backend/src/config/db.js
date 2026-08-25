import mongoose from "mongoose"
import { Config } from "./config.js"


export async function connectdb(){

    try{
       await mongoose.connect(Config.MONGO_URI).
       then(console.log("db connected"))
    }
    catch(err){

    }
}