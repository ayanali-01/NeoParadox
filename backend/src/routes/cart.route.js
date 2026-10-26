import express from 'express';
import { authenticateUser } from '../middleware/auth.middleware.js';
import { validateAddToCart, validateIncrementCartItemQuantity } from '../validators/cart.validate.js';
import { addToCart, createOrderController, getCart, incrementCartItemQuantity, verifyOrderController } from '../controllers/cart.controller.js';





 const router = express.Router();



router.post("/add/:productId", authenticateUser, validateAddToCart, addToCart)


router.get('/', authenticateUser, getCart)


export default router