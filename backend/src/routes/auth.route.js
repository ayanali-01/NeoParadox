import {Router} from "express"
import passport from "passport"
import { validateregisteruser,validateloginuser } from "../validators/auth.validator.js"
import { registeruser,loginuser,googlecallback } from "../controllers/auth.controller.js"

const router = Router()

router.post("/register",validateregisteruser,registeruser)
router.post("/login",validateloginuser,loginuser)

// Google OAuth Login
router.get("/google", passport.authenticate("google", {
    scope: ["email", "profile"],
    session: false
}))

// Google OAuth Callback
router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    session: false
}), googlecallback)

export default router