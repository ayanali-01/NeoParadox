import {
    addItem,
    getCart,
    incrementCartItemApi,
    decrementCartItemApi,
    removeCartItemApi,
    createCartOrder,
    verifyCartOrder
} from "../service/cart.api"
import { useDispatch, useSelector } from "react-redux"
import {
    setCart,
    setCartLoading,
    incrementCartItem,
    decrementCartItem,
    removeCartItem as removeCartItemAction
} from "../state/cart.slice"

export const useCart = () => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    async function handleGetCart() {
        dispatch(setCartLoading(true))
        try {
            const data = await getCart()
            if (data?.cart) {
                dispatch(setCart(data.cart))
            }
            return data
        } finally {
            dispatch(setCartLoading(false))
        }
    }

    async function handleAddItem({ productId, variantId }) {
        const data = await addItem({ productId, variantId })
        try {
            const cartData = await getCart()
            if (cartData?.cart) {
                dispatch(setCart(cartData.cart))
            }
        } catch {
            // Silently handle getCart fallback
        }
        return data
    }

    async function handleIncrementCartItem({ productId }) {
        dispatch(incrementCartItem({ productId }))
        try {
            await incrementCartItemApi({ productId })
            const cartData = await getCart()
            if (cartData?.cart) {
                dispatch(setCart(cartData.cart))
            }
        } catch (error) {
            console.error("Failed to increment cart item:", error)
            await handleGetCart().catch(() => {})
        }
    }

    async function handleDecrementCartItem({ productId }) {
        dispatch(decrementCartItem({ productId }))
        try {
            await decrementCartItemApi({ productId })
            const cartData = await getCart()
            if (cartData?.cart) {
                dispatch(setCart(cartData.cart))
            }
        } catch (error) {
            console.error("Failed to decrement cart item:", error)
            await handleGetCart().catch(() => {})
        }
    }

    async function handleRemoveCartItem({ productId }) {
        dispatch(removeCartItemAction({ productId }))
        try {
            await removeCartItemApi({ productId })
            const cartData = await getCart()
            if (cartData?.cart) {
                dispatch(setCart(cartData.cart))
            }
        } catch (error) {
            console.error("Failed to remove cart item:", error)
            await handleGetCart().catch(() => {})
        }
    }

    async function handleCreateCartOrder() {
        const data = await createCartOrder()
        return data.order
    }

    async function handleVerifyCartOrder({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
        const data = await verifyCartOrder({ razorpay_order_id, razorpay_payment_id, razorpay_signature })
        return data.success
    }

    const items = cart?.items || []
    const cartCount = items.reduce((sum, item) => sum + (Number(item?.quantity) || 1), 0)
    const totalPrice = cart?.totalPrice ?? items.reduce((sum, item) => {
        const amount = item?.price?.amount || item?.product?.price?.amount || 0
        return sum + amount * (Number(item?.quantity) || 1)
    }, 0)
    const currency = cart?.currency || items[0]?.price?.currency || items[0]?.product?.price?.currency || "INR"

    return {
        cart,
        cartItems: items,
        cartCount,
        totalPrice,
        currency,
        isLoading: cart?.isLoading || false,
        handleAddItem,
        handleGetCart,
        handleIncrementCartItem,
        handleDecrementCartItem,
        handleRemoveCartItem,
        handleCreateCartOrder,
        handleVerifyCartOrder
    }
}