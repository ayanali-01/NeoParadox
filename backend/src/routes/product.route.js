import express from "express"
import {authenticateSeller} from "../middleware/auth.middleware.js"
import multer from "multer"
import { createProduct , getSellerProducts,getAllProducts } from "../controllers/product.controller.js"



const router = express.Router()



const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
})



router.post("/", upload.array("images", 5), authenticateSeller, createProduct)



router.get("/seller", authenticateSeller, getSellerProducts)


router.get("/", getAllProducts)






export default router