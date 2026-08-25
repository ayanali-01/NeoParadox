import express from "express"
import authrouter from "./routes/auth.route.js"




const app = express()


app.use(express.json())


app.use("/api/auth",authrouter)





export default app