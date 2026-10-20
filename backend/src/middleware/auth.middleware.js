import jwt from "jsonwebtoken"
import usermodel from "../models/user.model.js"
import { Config } from "../config/config.js";



export const authenticateSeller = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {

        const decoded = jwt.verify(token, Config.JWT_SECRET)

        const user = await usermodel.findById(decoded.id)

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        if (user.role !== "seller") {
            return res.status(403).json({ message: "Forbidden" })
        }

        req.user = user
        next()

    } catch (err) {
        console.log(err)
        return res.status(401).json({ message: "Unauthorized" })
    }
}