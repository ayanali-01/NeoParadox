import express from 'express';
import { authenticateUser } from '../middleware/auth.middleware.js';
import { validateAddToCart } from '../validators/cart.validate.js';
import {
    addToCart,
    getCart,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
    createOrderController,
    verifyOrderController
} from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/', authenticateUser, getCart);
router.post("/add/:productId", authenticateUser, validateAddToCart, addToCart);
router.patch('/quantity/increment/:productId', authenticateUser, incrementCartItemQuantity);
router.patch('/quantity/decrement/:productId', authenticateUser, decrementCartItemQuantity);
router.delete('/remove/:productId', authenticateUser, removeCartItem);
router.post('/payment/create/order', authenticateUser, createOrderController);
router.post('/payment/verify/order', authenticateUser, verifyOrderController);

export default router;