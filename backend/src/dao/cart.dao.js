import cartModel from "../models/cart.model.js";
import mongoose from "mongoose";

export async function getCartDetails(userId) {
    const cartData = await cartModel.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(userId)
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
        return null;
    }

    return cart;
}
