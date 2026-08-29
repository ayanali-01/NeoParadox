import express from "express"
import authrouter from "./routes/auth.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import passport from "passport"
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import { Config } from "./config/config.js"

const app = express()


app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))


app.use(passport.initialize())

passport.use(new GoogleStrategy({
        clientID: Config.GOOGLE_CLIENT_ID,
        clientSecret: Config.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
        return done(null, profile)
}))



app.use("/api/auth", authrouter)







export default app