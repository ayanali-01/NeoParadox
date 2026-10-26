import { addItem, getCart, incrementCartItemApi, createCartOrder, verifyCartOrder } from "../service/cart.api"
import { useDispatch } from "react-redux"
import { setCart, incrementCartItem } from "../state/cart.slice"

export const useCart = () => {
    const dispatch = useDispatch()

    async function handleAddItem({ productId, variantId }) {
        const data = await addItem({ productId, variantId })
        try {
            const cartData = await getCart()
            if (cartData?.cart) {
                dispatch(setCart(cartData.cart))
            }
        } catch {
            // Cart fetch failed silently
        }
        return data
    }

    async function handleGetCart() {
        const data = await getCart()
        if (data?.cart) {
            dispatch(setCart(data.cart))
        }
        return data
    }

    async function handleIncrementCartItem({ productId, variantId }) {
        await incrementCartItemApi({ productId, variantId })
        dispatch(incrementCartItem({ productId, variantId }))
    }

    async function handleCreateCartOrder() {
        const data = await createCartOrder()
        return data.order
    }

    async function handleVerifyCartOrder({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
        const data = await verifyCartOrder({ razorpay_order_id, razorpay_payment_id, razorpay_signature })
        return data.success
    }

    return { handleAddItem, handleGetCart, handleIncrementCartItem, handleCreateCartOrder, handleVerifyCartOrder }
}