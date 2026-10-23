import {Router} from "express"
import passport from "passport"
import { validateregisteruser,validateloginuser } from "../validators/auth.validator.js"
import { getMe,registeruser,loginuser,googlecallback } from "../controllers/auth.controller.js"
import { authenticateUser } from "../middleware/auth.middleware.js"

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


router.get('/me', authenticateUser, getMe)



export default router