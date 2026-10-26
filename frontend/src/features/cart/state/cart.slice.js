import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        totalPrice: 0,
        currency: "INR",
        items: [],
        isLoading: false,
    },
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload?.items || [];
            state.totalPrice = action.payload?.totalPrice ?? 0;
            state.currency = action.payload?.currency || "INR";
            state.isLoading = false;
        },
        setCartLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        incrementCartItem: (state, action) => {
            const { productId } = action.payload;
            state.items = state.items.map(item => {
                const id = item.product?._id || item.product;
                if (id === productId) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        },
        decrementCartItem: (state, action) => {
            const { productId } = action.payload;
            state.items = state.items
                .map(item => {
                    const id = item.product?._id || item.product;
                    if (id === productId) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                })
                .filter(item => item.quantity > 0);
        },
        removeCartItem: (state, action) => {
            const { productId } = action.payload;
            state.items = state.items.filter(item => {
                const id = item.product?._id || item.product;
                return id !== productId;
            });
        }
    }
});

export const {
    setCart,
    setCartLoading,
    addItem,
    incrementCartItem,
    decrementCartItem,
    removeCartItem
} = cartSlice.actions;

export default cartSlice.reducer;