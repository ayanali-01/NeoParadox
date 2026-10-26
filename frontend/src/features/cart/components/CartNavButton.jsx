import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hook/useCart'

export const CartNavButton = ({ className = '' }) => {
    const { cartCount } = useCart()

    return (
        <Link
            to="/cart"
            id="nav-cart-btn"
            aria-label={`Shopping cart with ${cartCount} items`}
            className={`group relative inline-flex items-center justify-center rounded-full border border-[#24251f]/15 p-2.5 text-[#24251f] transition-all duration-200 hover:border-[#8b6e38]/60 hover:text-[#8b6e38] ${className}`}
        >
            {/* Luxury minimal shopping tote icon */}
            <svg
                aria-hidden="true"
                className="h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-105"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>

            {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#8b6e38] px-1 font-sans text-[10px] font-bold text-[#f5f2eb] shadow-sm">
                    {cartCount > 99 ? '99+' : cartCount}
                </span>
            )}
        </Link>
    )
}

export default CartNavButton
