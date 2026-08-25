import {Router} from "express"
import { validateregisteruser } from "../validators/auth.validator.js"
import { registeruser } from "../controllers/auth.controller.js"
 const router = Router()




router.post("/register",validateregisteruser,registeruser)




export default router