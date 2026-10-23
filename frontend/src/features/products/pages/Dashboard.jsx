import React, { useEffect, useState } from 'react';
import { useProduct } from '../hook/useProduct';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Dashboard = () => {
    const { handleDeleteProduct, handleGetSellerProduct } = useProduct();
    const sellerProducts = useSelector(state => state.product?.sellerProducts || []);
    const navigate = useNavigate();
    const [deletingProductId, setDeletingProductId] = useState(null);
    const [deleteError, setDeleteError] = useState('');

    useEffect(() => {
        handleGetSellerProduct();
    }, [handleGetSellerProduct]);

    const handleRemoveProduct = async (event, product) => {
        event.stopPropagation();
        const shouldDelete = window.confirm(`Remove "${product.title}" from your vault? This cannot be undone.`);
        if (!shouldDelete) return;

        setDeletingProductId(product._id);
        setDeleteError('');
        try {
            await handleDeleteProduct(product._id);
        } catch (error) {
            console.error('Failed to delete product', error);
            setDeleteError('We couldn’t remove this listing. Please try again.');
        } finally {
            setDeletingProductId(null);
        }
    };

    return (
        <>
            {/* Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />

            <div
                className="min-h-screen selection:bg-[#c9a84c]/30"
                style={{
                    backgroundColor: '#080810',
                    backgroundImage: 'radial-gradient(ellipse at 85% 12%, rgba(139,92,246,0.08), transparent 35%)',
                    fontFamily: "'Inter', sans-serif",
                    color: 'rgba(255,255,255,0.9)'
                }}
            >
                <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24">

                    {/* ── Top Bar ── */}
                    <div className="pt-10 pb-0 flex items-center gap-5">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-lg transition-colors duration-200 leading-none"
                            style={{ color: 'rgba(255,255,255,0.35)' }}
                            aria-label="Go back"
                            onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
                        >
                            ←
                        </button>
                        <span
                            className="text-xs font-medium tracking-[0.32em] uppercase text-[#c9a84c]"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                            NeoParadox
                        </span>
                    </div>

                    {/* ── Page Header ── */}
                    <div className="pt-10 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#c9a84c]">
                                SELLER ARCHIVE
                            </span>
                            <h1
                                className="text-4xl lg:text-5xl font-light leading-tight text-white mt-1"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                Your Vault
                            </h1>
                            {/* Gold rule separator */}
                            <div className="mt-4 w-14 h-px bg-[#c9a84c]" />
                        </div>

                        <button
                            onClick={() => navigate('/seller/create-product')}
                            className="py-4 px-8 text-[11px] uppercase tracking-[0.3em] font-semibold transition-all duration-300 w-full md:w-auto text-center bg-[#c9a84c] text-[#080810] hover:bg-[#e0be62]"
                            style={{
                                fontFamily: "'Inter', sans-serif"
                            }}
                        >
                            New Listing
                        </button>
                    </div>

                    {/* ── Product Grid ── */}
                    {deleteError && (
                        <p role="alert" className="mb-6 border border-red-400/30 bg-red-400/5 px-4 py-3 text-sm text-red-300">
                            {deleteError}
                        </p>
                    )}
                    {sellerProducts && sellerProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 pb-24">
                            {sellerProducts.map(product => {
                                const imageUrl = product.images && product.images.length > 0
                                    ? product.images[0].url
                                    : '/auth-editorial.jpg';

                                return (
                                    <div
                                        onClick={() => { navigate(`/seller/product/${product._id}`) }}
                                        key={product._id}
                                        className="group cursor-pointer flex flex-col"
                                    >
                                        {/* Image Container */}
                                        <div className="aspect-[4/5] overflow-hidden mb-6 bg-[#0f0f18] relative border border-white/5">
                                            <img
                                                src={imageUrl}
                                                alt={product.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            {/* Hover subtle dark glow */}
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex flex-col gap-2">
                                            <h3
                                                className="text-xl leading-snug transition-colors duration-300 text-white/90 group-hover:text-[#c9a84c]"
                                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                            >
                                                {product.title}
                                            </h3>

                                            <p
                                                className="text-[12px] line-clamp-2 leading-relaxed text-white/40"
                                            >
                                                {product.description}
                                            </p>

                                            <div className="mt-2 flex items-center justify-between">
                                                <span
                                                    className="text-xs uppercase tracking-[0.2em] font-medium text-[#c9a84c]"
                                                >
                                                    {product.price?.currency} {product.price?.amount?.toLocaleString()}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={event => handleRemoveProduct(event, product)}
                                                    disabled={deletingProductId === product._id}
                                                    className="border border-red-400/30 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-red-300 transition-colors hover:border-red-400/70 hover:bg-red-400/10 disabled:cursor-wait disabled:opacity-50"
                                                    aria-label={`Remove ${product.title}`}
                                                >
                                                    {deletingProductId === product._id ? 'Removing…' : 'Remove'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="py-24 text-center flex flex-col items-center">
                            <span className="text-[10px] uppercase tracking-[0.3em] font-medium mb-3 text-[#c9a84c]">
                                Empty Vault
                            </span>
                            <p
                                className="max-w-md mx-auto text-lg leading-relaxed text-white/50"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                You haven't added any curated pieces to your archive yet. Begin by creating a new listing.
                            </p>
                            <button
                                onClick={() => navigate('/seller/create-product')}
                                className="mt-6 py-3 px-6 text-[10px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 bg-white/[0.05] hover:bg-white/[0.1] text-white/80 hover:text-white"
                            >
                                Create First Listing
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;