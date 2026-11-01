import mongoose from "mongoose";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import { createOrder } from "../services/payment.service.js";
import { getCartDetails } from "../dao/cart.dao.js";


export const addToCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity = 1 } = req.body;

        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }

        let cart = await cartModel.findOne({ user: req.user._id });
        if (!cart) {
            cart = await cartModel.create({ user: req.user._id, items: [] });
        }

        const isProductAlreadyInCart = cart.items.some(
            item => item.product.toString() === productId
        );

        if (isProductAlreadyInCart) {
            await cartModel.findOneAndUpdate(
                { user: req.user._id, "items.product": productId },
                { $inc: { "items.$.quantity": quantity } },
                { new: true }
            );

            return res.status(200).json({
                message: "Cart updated successfully",
                success: true
            });
        }

        cart.items.push({
            product: productId,
            quantity,
            price: product.price
        });

        await cart.save();

        return res.status(200).json({
            message: "Product added to cart successfully",
            success: true
        });
    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).json({
            message: "Failed to add item to cart",
            success: false
        });
    }
};



export const getCart = async (req, res) => {
    try {
        const cartData = await cartModel.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user._id)
                }
            },
            { $unwind: { path: '$items', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'products',
                    localField: 'items.product',
                    foreignField: '_id',
                    as: 'items.product'
                }
            },
            { $unwind: { path: '$items.product', preserveNullAndEmptyArrays: true } },
            {
                $addFields: {
                    itemPrice: {
                        $multiply: [
                            { $ifNull: ['$items.quantity', 0] },
                            { $ifNull: ['$items.product.price.amount', { $ifNull: ['$items.price.amount', 0] }] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: '$_id',
                    totalPrice: { $sum: '$itemPrice' },
                    currency: {
                        $first: {
                            $ifNull: ['$items.product.price.currency', { $ifNull: ['$items.price.currency', 'INR'] }]
                        }
                    },
                    items: {
                        $push: {
                            $cond: [
                                { $ifNull: ['$items.product._id', false] },
                                '$items',
                                '$$REMOVE'
                            ]
                        }
                    }
                }
            }
        ]);

        const cart = cartData[0];

        if (!cart || !cart.items || cart.items.length === 0) {
            return res.status(200).json({
                success: true,
                cart: {
                    items: [],
                    totalPrice: 0,
                    currency: "INR"
                }
            });
        }

        return res.status(200).json({
            success: true,
            cart: {
                _id: cart._id,
                items: cart.items,
                totalPrice: cart.totalPrice,
                currency: cart.currency || "INR"
            }
        });
    } catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({
            message: "Failed to fetch cart",
            success: false
        });
    }
};



export const incrementCartItemQuantity = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await cartModel.findOneAndUpdate(
            { user: req.user._id, "items.product": productId },
            { $inc: { "items.$.quantity": 1 } },
            { new: true }
        );

        return res.status(200).json({
            message: "Cart item incremented",
            success: true,
            cart
        });
    } catch (error) {
        console.error("Error incrementing cart item:", error);
        return res.status(500).json({
            message: "Failed to increment cart item",
            success: false
        });
    }
};



export const decrementCartItemQuantity = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await cartModel.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found", success: false });
        }

        const item = cart.items.find(i => i.product.toString() === productId);
        if (!item) {
            return res.status(404).json({ message: "Item not in cart", success: false });
        }

        if (item.quantity <= 1) {
            cart.items = cart.items.filter(i => i.product.toString() !== productId);
        } else {
            item.quantity -= 1;
        }

        await cart.save();
        return res.status(200).json({
            message: "Cart item decremented",
            success: true,
            cart
        });
    } catch (error) {
        console.error("Error decrementing cart item:", error);
        return res.status(500).json({
            message: "Failed to decrement cart item",
            success: false
        });
    }
};



export const removeCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await cartModel.findOneAndUpdate(
            { user: req.user._id },
            { $pull: { items: { product: productId } } },
            { new: true }
        );

        return res.status(200).json({
            message: "Item removed from cart",
            success: true,
            cart
        });
    } catch (error) {
        console.error("Error removing cart item:", error);
        return res.status(500).json({
            message: "Failed to remove item from cart",
            success: false
        });
    }
};




export const createOrderController = async (req, res) => {
    try {
        const cart = await getCartDetails(req.user._id);

        if (!cart || !cart.items || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty",
                success: false
            });
        }

        const order = await createOrder({ amount: cart.totalPrice, currency: cart.currency });

        return res.status(200).json({
            message: "Order created successfully",
            success: true,
            order
        });
    } catch (error) {
        console.error("Error creating cart order:", error);
        return res.status(500).json({
            message: error.message || "Failed to create order",
            success: false
        });
    }
};


export const verifyOrderController = async (req, res) => {
    return res.status(501).json({
        message: "Order verification not implemented yet",
        success: false
    });
};