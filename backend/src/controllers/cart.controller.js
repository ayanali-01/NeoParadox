import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

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
        const cart = await cartModel.findOne({ user: req.user._id }).populate('items.product');

        if (!cart) {
            return res.status(200).json({
                success: true,
                cart: {
                    items: [],
                    totalPrice: 0,
                    currency: "INR"
                }
            });
        }

        const totalPrice = cart.items.reduce((total, item) => {
            const amount = item.price?.amount || item.product?.price?.amount || 0;
            return total + amount * (item.quantity || 1);
        }, 0);

        const currency = cart.items[0]?.price?.currency || cart.items[0]?.product?.price?.currency || "INR";

        return res.status(200).json({
            success: true,
            cart: {
                ...cart.toObject(),
                totalPrice,
                currency
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

export const createOrderController = async (req, res) => {
    return res.status(501).json({
        message: "Order creation not implemented yet",
        success: false
    });
};

export const verifyOrderController = async (req, res) => {
    return res.status(501).json({
        message: "Order verification not implemented yet",
        success: false
    });
};