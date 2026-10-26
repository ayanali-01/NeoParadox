import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useCart } from '../hook/useCart'
import CartNavButton from '../components/CartNavButton'

const formatPrice = (amount, currency = 'INR') => {
    const num = Number(amount)
    return `${currency} ${Number.isFinite(num) ? num.toLocaleString() : '0'}`.trim()
}

const Cart = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    const {
        cartItems,
        cartCount,
        totalPrice,
        currency,
        isLoading,
        handleGetCart,
        handleIncrementCartItem,
        handleDecrementCartItem,
        handleRemoveCartItem,
        handleCreateCartOrder
    } = useCart()

    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const [actionMessage, setActionMessage] = useState(null)
    const [updatingItemId, setUpdatingItemId] = useState(null)

    useEffect(() => {
        handleGetCart().catch(() => {})
    }, [])

    const handleQuantityChange = async (productId, change) => {
        setUpdatingItemId(productId)
        try {
            if (change === 1) {
                await handleIncrementCartItem({ productId })
            } else if (change === -1) {
                await handleDecrementCartItem({ productId })
            }
        } catch (err) {
            console.error('Failed to update quantity:', err)
            setActionMessage({ type: 'error', text: 'Could not update quantity' })
            setTimeout(() => setActionMessage(null), 3000)
        } finally {
            setUpdatingItemId(null)
        }
    }

    const handleRemove = async (productId) => {
        setUpdatingItemId(productId)
        try {
            await handleRemoveCartItem({ productId })
            setActionMessage({ type: 'success', text: 'Item removed from bag' })
            setTimeout(() => setActionMessage(null), 3000)
        } catch (err) {
            console.error('Failed to remove item:', err)
            setActionMessage({ type: 'error', text: 'Could not remove item' })
            setTimeout(() => setActionMessage(null), 3000)
        } finally {
            setUpdatingItemId(null)
        }
    }

    const onProceedToCheckout = async () => {
        if (cartItems.length === 0 || isCheckingOut) return
        setIsCheckingOut(true)
        setActionMessage(null)

        try {
            // Attempt order creation via cart API
            await handleCreateCartOrder()
            setActionMessage({ type: 'success', text: 'Order initiated successfully.' })
        } catch (err) {
            console.error('Checkout error:', err)
            const msg = err?.response?.data?.message || 'Secure checkout is being prepared for this collection.'
            setActionMessage({ type: 'info', text: msg })
        } finally {
            setIsCheckingOut(false)
            setTimeout(() => setActionMessage(null), 5000)
        }
    }

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />
            <main
                className="min-h-screen bg-[#f5f2eb] text-[#24251f] selection:bg-[#d8c9a7]/60"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                {/* Header Navigation */}
                <header className="border-b border-[#24251f]/15">
                    <nav className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-14" aria-label="Cart navigation">
                        <Link to="/" className="font-serif text-xl tracking-[0.08em] text-[#24251f] sm:text-2xl">
                            neo <span className="italic text-[#9b8050]">paradox</span>
                        </Link>
                        <div className="flex items-center gap-4 sm:gap-7">
                            <Link
                                to="/"
                                className="inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#69685f] transition-colors hover:text-[#70582f] sm:text-sm sm:tracking-[0.18em]"
                            >
                                <span aria-hidden="true">←</span> The collection
                            </Link>
                            {user?.role === 'seller' && (
                                <Link
                                    to="/seller/dashboard"
                                    className="hidden text-xs uppercase tracking-[0.12em] text-[#69685f] transition-colors hover:text-[#70582f] sm:inline-block sm:text-sm sm:tracking-[0.16em]"
                                >
                                    Seller studio
                                </Link>
                            )}
                            <CartNavButton />
                        </div>
                    </nav>
                </header>

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 sm:pb-28 sm:pt-12 lg:px-14">
                    {/* Header Banner */}
                    <div className="mb-10 flex flex-col gap-2 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.24em] text-[#80683c]">
                                Thoughtful Acquisition · Your Archive
                            </p>
                            <h1 className="mt-2 font-serif text-4xl font-light tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                                Shopping Bag
                            </h1>
                        </div>
                        <p className="text-xs uppercase tracking-[0.18em] text-[#69685f]">
                            {cartCount === 1 ? '1 piece selected' : `${cartCount} pieces selected`}
                        </p>
                    </div>

                    {/* Status Alert Banner */}
                    {actionMessage && (
                        <div
                            role="status"
                            className={`mb-8 flex items-center justify-between border px-5 py-4 text-xs tracking-wider transition-all sm:text-sm ${
                                actionMessage.type === 'error'
                                    ? 'border-red-400 bg-red-50 text-red-800'
                                    : actionMessage.type === 'success'
                                    ? 'border-[#9b8050]/50 bg-[#e7e2d8]/60 text-[#24251f]'
                                    : 'border-[#9b8050]/40 bg-[#fbf9f5] text-[#70582f]'
                            }`}
                        >
                            <span>{actionMessage.text}</span>
                            <button
                                type="button"
                                onClick={() => setActionMessage(null)}
                                className="text-xs uppercase tracking-widest text-[#69685f] hover:text-[#24251f]"
                                aria-label="Dismiss message"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    {isLoading && cartItems.length === 0 ? (
                        /* Loading state */
                        <div className="flex min-h-[360px] flex-col items-center justify-center py-20 text-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#9b8050] border-t-transparent" />
                            <p className="mt-5 text-xs uppercase tracking-[0.22em] text-[#80683c]">
                                Retrieving your bag...
                            </p>
                        </div>
                    ) : cartItems.length === 0 ? (
                        /* Empty state */
                        <section aria-labelledby="empty-cart-title" className="border border-[#24251f]/10 bg-[#eee9e5]/40 px-6 py-20 text-center sm:px-12 sm:py-28">
                            <span aria-hidden="true" className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#9b8050]/30 font-serif text-2xl text-[#80683c]">
                                N
                            </span>
                            <h2 id="empty-cart-title" className="mt-6 font-serif text-3xl font-light tracking-[-0.02em] sm:text-4xl">
                                Your bag is currently empty
                            </h2>
                            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#69685f]">
                                You haven't added any pieces to your cart yet. Explore our curated selection of original finds from independent creators.
                            </p>
                            <Link
                                to="/"
                                className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 bg-[#24251f] px-8 text-xs font-medium uppercase tracking-[0.2em] text-[#f5f2eb] transition-colors hover:bg-[#70582f]"
                            >
                                Discover the collection
                            </Link>
                        </section>
                    ) : (
                        /* Cart Grid: Items List + Order Summary */
                        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16 xl:gap-20">
                            {/* Items Section */}
                            <section aria-label="Items in your shopping bag" className="divide-y divide-[#24251f]/15 border-y border-[#24251f]/15">
                                {cartItems.map((item) => {
                                    const product = item?.product || {}
                                    const productId = product?._id || item.product
                                    const title = product?.title || 'Selected Design Piece'
                                    const itemPrice = item?.price?.amount ?? product?.price?.amount ?? 0
                                    const itemCurrency = item?.price?.currency || product?.price?.currency || currency
                                    const imageUrl = product?.images?.[0]?.url || '/auth-editorial.jpg'
                                    const quantity = Number(item.quantity) || 1
                                    const itemSubtotal = itemPrice * quantity
                                    const isUpdating = updatingItemId === productId

                                    return (
                                        <article
                                            key={productId || Math.random()}
                                            className={`grid grid-cols-[80px_1fr] gap-5 py-6 sm:grid-cols-[110px_1fr] sm:gap-7 sm:py-8 ${
                                                isUpdating ? 'opacity-60 pointer-events-none' : ''
                                            }`}
                                        >
                                            {/* Product Image Thumbnail */}
                                            <Link
                                                to={`/product/${productId}`}
                                                className="group aspect-[4/5] overflow-hidden bg-[#e7e2d8]"
                                                aria-label={`View ${title}`}
                                            >
                                                <img
                                                    src={imageUrl}
                                                    alt={title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            </Link>

                                            {/* Item Details */}
                                            <div className="flex flex-col justify-between">
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                                                    <div>
                                                        <Link
                                                            to={`/product/${productId}`}
                                                            className="font-serif text-xl font-normal leading-snug tracking-[-0.01em] text-[#24251f] transition-colors hover:text-[#70582f] sm:text-2xl"
                                                        >
                                                            {title}
                                                        </Link>
                                                        <p className="mt-1 text-xs text-[#69685f]">
                                                            Item price: {formatPrice(itemPrice, itemCurrency)}
                                                        </p>
                                                    </div>
                                                    <p className="mt-2 font-medium text-[#24251f] sm:mt-0 sm:text-right sm:text-lg">
                                                        {formatPrice(itemSubtotal, itemCurrency)}
                                                    </p>
                                                </div>

                                                {/* Quantity Controls & Remove Action */}
                                                <div className="mt-5 flex items-center justify-between pt-2">
                                                    <div className="flex items-center border border-[#24251f]/20 bg-[#f5f2eb]" aria-label="Quantity selector">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleQuantityChange(productId, -1)}
                                                            disabled={isUpdating}
                                                            className="flex h-9 w-9 items-center justify-center text-sm font-medium text-[#24251f] transition-colors hover:bg-[#24251f]/10 disabled:opacity-40"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="flex h-9 w-10 items-center justify-center text-xs font-semibold tracking-wider text-[#24251f]">
                                                            {quantity}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleQuantityChange(productId, 1)}
                                                            disabled={isUpdating}
                                                            className="flex h-9 w-9 items-center justify-center text-sm font-medium text-[#24251f] transition-colors hover:bg-[#24251f]/10 disabled:opacity-40"
                                                            aria-label="Increase quantity"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemove(productId)}
                                                        disabled={isUpdating}
                                                        className="text-xs uppercase tracking-[0.16em] text-[#69685f] underline decoration-[#24251f]/20 underline-offset-4 transition-colors hover:text-red-700 disabled:opacity-40"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    )
                                })}
                            </section>

                            {/* Order Summary Card */}
                            <aside aria-label="Order summary" className="h-fit">
                                <div className="border border-[#24251f]/15 bg-[#eee9e5]/40 p-6 sm:p-8">
                                    <h2 className="font-serif text-2xl font-light tracking-[-0.02em] text-[#24251f]">
                                        Order Summary
                                    </h2>

                                    <div className="mt-6 space-y-4 border-b border-[#24251f]/15 pb-6 text-sm">
                                        <div className="flex justify-between text-[#69685f]">
                                            <span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                                            <span className="text-[#24251f]">{formatPrice(totalPrice, currency)}</span>
                                        </div>
                                        <div className="flex justify-between text-[#69685f]">
                                            <span>Insured Transit</span>
                                            <span className="text-[#80683c] uppercase text-xs tracking-wider">Complimentary</span>
                                        </div>
                                        <div className="flex justify-between text-[#69685f]">
                                            <span>Archival Packaging</span>
                                            <span className="text-[#80683c] uppercase text-xs tracking-wider">Included</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-baseline justify-between">
                                        <span className="text-xs uppercase tracking-[0.18em] text-[#24251f]">Estimated Total</span>
                                        <span className="font-serif text-3xl font-medium tracking-tight text-[#24251f]">
                                            {formatPrice(totalPrice, currency)}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        id="checkout-btn"
                                        onClick={onProceedToCheckout}
                                        disabled={isCheckingOut || cartItems.length === 0}
                                        className="mt-8 flex min-h-14 w-full items-center justify-center gap-3 bg-[#24251f] px-6 text-xs font-medium uppercase tracking-[0.2em] text-[#f5f2eb] transition-colors hover:bg-[#70582f] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isCheckingOut ? 'Securing order...' : 'Proceed to checkout'}
                                    </button>

                                    <div className="mt-8 space-y-3 pt-4 text-xs text-[#69685f]">
                                        <div className="flex items-start gap-2.5">
                                            <span className="text-[#8b6e38]">✓</span>
                                            <p>Direct from verified independent creators</p>
                                        </div>
                                        <div className="flex items-start gap-2.5">
                                            <span className="text-[#8b6e38]">✓</span>
                                            <p>Discreet luxury packaging & transit protection</p>
                                        </div>
                                        <div className="flex items-start gap-2.5">
                                            <span className="text-[#8b6e38]">✓</span>
                                            <p>Encrypted and secure payments</p>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}

export default Cart
