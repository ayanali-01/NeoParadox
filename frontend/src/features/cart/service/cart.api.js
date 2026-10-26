import axios from "axios"

const cartApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/cart",
    withCredentials: true
})

export const addItem = async ({ productId, variantId }) => {
    const url = variantId ? `/add/${productId}/${variantId}` : `/add/${productId}`
    const response = await cartApiInstance.post(url, {
        quantity: 1
    })
    return response.data
}

export const getCart = async () => {
    const response = await cartApiInstance.get("/")
    return response.data
}

export const incrementCartItemApi = async ({ productId }) => {
    const response = await cartApiInstance.patch(`/quantity/increment/${productId}`)
    return response.data
}

export const decrementCartItemApi = async ({ productId }) => {
    const response = await cartApiInstance.patch(`/quantity/decrement/${productId}`)
    return response.data
}

export const removeCartItemApi = async ({ productId }) => {
    const response = await cartApiInstance.delete(`/remove/${productId}`)
    return response.data
}

export const createCartOrder = async () => {
    const response = await cartApiInstance.post("/payment/create/order")
    return response.data
}

export const verifyCartOrder = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
    const response = await cartApiInstance.post("/payment/verify/order", {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    })
    return response.data
}