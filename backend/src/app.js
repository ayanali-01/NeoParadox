import express from "express"
import authrouter from "./routes/auth.route.js"
import cors from "cors"




const app = express()


app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))



app.use("/api/auth", authrouter)

app.use





export default app