import mongoose from "mongoose"
import { Config } from "./config.js"

let connectionPromise

export async function connectdb(){
    if (mongoose.connection.readyState === 1) {
        return
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(Config.MONGO_URI)
            .then(() => {
                console.log("db connected")
            })
            .catch((error) => {
                connectionPromise = undefined
                throw error
            })
    }

    await connectionPromise
}