import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useProduct } from '../hook/useProduct'
import CartNavButton from '../../cart/components/CartNavButton'

const ProductCard = ({ product }) => {
    const image = product.images?.[0]?.url || '/pic3.jpg'
    const priceAmount = Number(product.price?.amount || 0).toLocaleString()
    const currency = product.price?.currency || 'INR'

    return (
        <Link 
            to={`/product/${product._id}`} 
            className="group block rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 p-3 sm:p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-xl"
        >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
                <img
                    src={image}
                    alt={product.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-2.5 right-2.5 rounded-full border border-neutral-300/80 dark:border-neutral-700 bg-white/85 dark:bg-neutral-900/85 px-2.5 py-1 font-mono text-[10px] tracking-wider text-neutral-800 dark:text-neutral-200 backdrop-blur-md">
                    2025
                </div>
            </div>
            <div className="mt-3.5 flex flex-col justify-between gap-1.5 sm:mt-4">
                <div className="flex items-baseline justify-between gap-2">
                    <h3 className="truncate font-sans text-base sm:text-lg font-bold text-neutral-950 dark:text-white transition-colors group-hover:text-[#8b6e38] dark:group-hover:text-[#d9bd78]">
                        {product.title}
                    </h3>
                    <p className="shrink-0 font-mono text-sm sm:text-base font-semibold text-neutral-950 dark:text-neutral-100">
                        {currency} {priceAmount}
                    </p>
                </div>
                <p className="line-clamp-2 text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {product.description || 'Modern silhouette, premium craftsmanship, curated for personal distinction.'}
                </p>
            </div>
        </Link>
    )
}

const Home = () => {
    const { handleGetAllProducts } = useProduct()
    const products = useSelector(state => state.product?.products || [])
    const user = useSelector(state => state.auth?.user)
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = window.localStorage.getItem('neoparadox-theme')
        return saved ? saved === 'dark' : false
    })

    const loadProducts = useCallback(async () => {
        setIsLoading(true)
        setError('')
        try {
            await handleGetAllProducts()
        } catch (loadError) {
            console.error('Failed to load products', loadError)
            setError('We couldn’t load the collection. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }, [handleGetAllProducts])

    useEffect(() => {
        loadProducts()
    }, [loadProducts])

    useEffect(() => {
        window.localStorage.setItem('neoparadox-theme', isDarkMode ? 'dark' : 'light')
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode])

    const filteredProducts = products.filter(product => {
        const query = search.trim().toLowerCase()
        return !query || `${product.title} ${product.description}`.toLowerCase().includes(query)
    })

    const featuredProduct = products[0] || null
    const instagramUrl = "https://www.instagram.com/neo.paradox.in1?mdxt=ZDNlZDc0MzIxNw=="

    const newLocal = <a href="#collection" className="transition-colors hover:text-neutral-950 dark:hover:text-white font-medium ">
        Collections
    </a>
    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap"
                rel="stylesheet"
            />

            <div
                className={`min-h-screen w-full transition-colors duration-300 ${
                    isDarkMode ? 'bg-[#09090c] text-white dark' : 'bg-[#eeece6] text-neutral-900'
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                {/* ── Outer Framed Container matching Concept ── */}
                <div className="p-2 sm:p-4 md:p-6 lg:p-8">
                    <main
                        data-theme={isDarkMode ? 'dark' : 'light'}
                        className="mx-auto max-w-[1560px] overflow-hidden rounded-[26px] sm:rounded-[36px] md:rounded-[44px] border border-neutral-300/90 dark:border-neutral-800 bg-[#f8f7f5] dark:bg-[#0e0e12] shadow-2xl transition-colors duration-300"
                    >
                        {/* ── Top Navigation Bar ── */}
                        <header className="border-b border-neutral-300/80 dark:border-neutral-800/90 px-5 py-4 sm:px-8 sm:py-5 lg:px-12">
                            <nav className="flex items-center justify-between gap-4" aria-label="Main navigation">
                                {/* Left Brand Logo: Neo Paradox + Constellation Icon */}
                                <Link to="/" className="group flex items-center gap-2.5">
                                    <div className="flex flex-col text-left leading-none">
                                        <span className="font-['Syne',sans-serif] text-base sm:text-lg font-extrabold tracking-tight text-neutral-950 dark:text-white uppercase">
                                            neo
                                        </span>
                                        <span className="font-mono text-xs sm:text-sm font-normal tracking-wide text-neutral-700 dark:text-neutral-300 uppercase">
                                            paradox
                                        </span>
                                    </div>
                                    <span 
                                        className="text-xs sm:text-sm text-neutral-900 dark:text-neutral-200 select-none opacity-80 transition-transform group-hover:rotate-45 duration-300"
                                        aria-hidden="true"
                                    >
                                        ✦˙⋆
                                    </span>
                                </Link>

                                {/* Center Links: shop (and seller studio if applicable) */}
                                <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-300">
                                    {newLocal}
                                    {user?.role === 'seller' && (
                                        <Link to="/seller/dashboard" className="text-[#8b6e38] dark:text-[#d9bd78] hover:underline font-semibold">
                                            studio
                                        </Link>
                                    )}
                                </div>

                                {/* Right Controls: Instagram, Account ID, Cart, Theme Toggle */}
                                <div className="flex items-center gap-3 sm:gap-4 font-mono text-xs">
                                    {/* 📷 Official Brand Instagram Icon Button */}
                                    <a
                                        href={instagramUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Neo Paradox Instagram profile"
                                        title="Follow Neo Paradox on Instagram"
                                        className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 text-neutral-800 dark:text-neutral-100 shadow-sm transition-all duration-200 hover:scale-105 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-neutral-950"
                                    >
                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                        </svg>
                                    </a>

                                    {/* Account ID / User Display */}
                                    <span className="hidden xl:inline-block tracking-wider text-neutral-600 dark:text-neutral-300">
                                        account id - {user?.fullname ? user.fullname.replace(/\s+/g, '.').toLowerCase().slice(0, 10) : '003.201'}
                                    </span>

                                    {/* Cart Button */}
                                    <CartNavButton className="dark:border-neutral-700 dark:text-white dark:hover:border-white" />

                                    {/* Dark / Light Mode Switch */}
                                    <button
                                        type="button"
                                        onClick={() => setIsDarkMode(current => !current)}
                                        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                                        className="flex h-9 items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 px-3 text-xs tracking-wider text-neutral-800 dark:text-neutral-200 transition-colors hover:border-neutral-950 dark:hover:border-white"
                                    >
                                        {isDarkMode ? (
                                            <svg aria-hidden="true" className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="4" />
                                                <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                                            </svg>
                                        ) : (
                                            <svg aria-hidden="true" className="h-3.5 w-3.5 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />
                                            </svg>
                                        )}
                                        <span className="hidden sm:inline font-mono">{isDarkMode ? 'light' : 'dark'}</span>
                                    </button>
                                </div>
                            </nav>
                        </header>

                        {/* ── Brand Hero Stage: Brand Identity Lockup ── */}
                        <section id="top" className="relative px-6 pt-6 pb-12 sm:px-10 sm:pt-10 sm:pb-16 lg:px-16 lg:pb-20 overflow-hidden">
                            {/* Brand Identity Lockup: NP Monogram + neo paradox® + tagline */}
                            <div className="relative mx-auto flex flex-col items-center justify-center min-h-[420px] sm:min-h-[520px] md:min-h-[600px] lg:min-h-[680px] max-w-[1440px] w-full text-center py-8 sm:py-12 lg:py-16 select-none">
                                <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-10">

                                    {/* NP Geometric Monogram SVG */}
                                    <svg
                                        viewBox="0 0 120 90"
                                        className="w-20 h-16 sm:w-28 sm:h-20 md:w-36 md:h-28 lg:w-44 lg:h-32 text-neutral-950 dark:text-white transition-colors"
                                        fill="currentColor"
                                        aria-label="NP monogram"
                                    >
                                        {/* N — left upright, diagonal, right upright */}
                                        <rect x="4" y="4" width="10" height="82" rx="2" />
                                        <polygon points="14,4 14,54 46,4" />
                                        <rect x="46" y="4" width="10" height="82" rx="2" />
                                        {/* P — left upright + bowl */}
                                        <rect x="68" y="4" width="10" height="82" rx="2" />
                                        <path d="M78,4 h22 a20,20 0 0 1 0,40 h-22 Z" />
                                        {/* Diagonal accent strike through NP center */}
                                        <polygon points="46,88 60,88 14,4 4,4" opacity="0.12" />
                                    </svg>

                                    {/* Brand Name */}
                                    <div className="flex flex-col items-center gap-0 leading-none">
                                        <h1
                                            className="font-['Plus_Jakarta_Sans',sans-serif] font-black lowercase tracking-[-0.04em] text-neutral-950 dark:text-white transition-colors"
                                            style={{ fontSize: 'clamp(3.5rem, 12vw, 10.5rem)', lineHeight: 0.88 }}
                                        >
                                            neo paradox
                                            <sup
                                                className="font-['Plus_Jakarta_Sans',sans-serif] font-bold align-super text-neutral-950 dark:text-white"
                                                style={{ fontSize: '0.28em', verticalAlign: 'super', lineHeight: 1 }}
                                            >
                                                ®
                                            </sup>
                                        </h1>
                                    </div>

                                    {/* Tagline with em-dash decorators */}
                                    <div className="flex items-center gap-4 sm:gap-6">
                                        <span className="block h-px w-10 sm:w-16 md:w-24 bg-neutral-500 dark:bg-neutral-400 transition-colors" />
                                        <span
                                            className="font-mono uppercase tracking-[0.28em] sm:tracking-[0.35em] text-neutral-600 dark:text-neutral-400 transition-colors whitespace-nowrap"
                                            style={{ fontSize: 'clamp(0.6rem, 1.4vw, 0.85rem)' }}
                                        >
                                            WEAR THE DIFFERENCE
                                        </span>
                                        <span className="block h-px w-10 sm:w-16 md:w-24 bg-neutral-500 dark:bg-neutral-400 transition-colors" />
                                    </div>

                                </div>
                            </div>

                            {/* Lower Hero Grid: Left Manifesto + Right Featured Card & Pill Button */}
                            <div id="manifesto" className="relative z-20 mt-6 sm:mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
                                {/* Lower Left: Industrial Badge & Brand Manifesto */}
                                <div className="max-w-md space-y-3.5">
                                    <div className="inline-flex items-center justify-center rounded-md border border-neutral-400 dark:border-neutral-600 px-2 py-0.5 font-mono text-xs font-bold text-neutral-900 dark:text-white select-none">
                                        プラ
                                    </div>
                                    <h2 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
                                        Clothes without <br className="hidden sm:inline" />excess. Only style.
                                    </h2>
                                    <p className="font-mono text-xs sm:text-sm tracking-wide text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-sm">
                                        Modern silhouettes, natural fabrics, and honest design. For those who choose simplicity and quality.
                                    </p>
                                </div>

                                {/* Lower Right: Featured 2025 Piece Card & Action Pill */}
                                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-end lg:items-end gap-3.5">
                                    {/* Preview Card */}
                                    <Link 
                                        to={featuredProduct ? `/product/${featuredProduct._id}` : '#collection'}
                                        className="group block w-36 sm:w-44 rounded-2xl border border-neutral-300/90 dark:border-neutral-800 bg-white/85 dark:bg-neutral-900/85 p-3 shadow-lg backdrop-blur-md transition-all hover:scale-105"
                                    >
                                        <div className="aspect-square w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
                                            <img
                                                src={featuredProduct?.images?.[0]?.url || "/pic3.jpg"}
                                                alt="Featured piece"
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="mt-2.5 flex items-center justify-between font-mono text-[11px] text-neutral-600 dark:text-neutral-400">
                                            <span className="truncate pr-1 text-neutral-800 dark:text-neutral-200">
                                                {featuredProduct?.title || "Neo Arc Jacket"}
                                            </span>
                                            <span className="font-bold text-neutral-950 dark:text-white shrink-0">
                                                2025
                                            </span>
                                        </div>
                                    </Link>

                                    {/* Pill Action Button */}
                                    <a
                                        href="#collection"
                                        className="group inline-flex items-center justify-between gap-5 rounded-full border border-neutral-400 dark:border-neutral-600 bg-white/90 dark:bg-neutral-900/90 px-6 py-2.5 font-mono text-xs tracking-wider text-neutral-950 dark:text-white shadow-sm transition-all hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 hover:border-neutral-950 dark:hover:border-white"
                                    >
                                        <span>new collection</span>
                                        <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                            ↗
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* ── The Marketplace Collection Section ── */}
                        <section 
                            id="collection" 
                            className="border-t border-neutral-300/80 dark:border-neutral-800/90 scroll-mt-6 px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
                        >
                            <div className="mb-8 flex flex-col justify-between gap-6 sm:mb-12 sm:flex-row sm:items-end">
                                <div>
                                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#8b6e38] dark:text-[#d9bd78]">
                                        // ARCHIVE CATALOG 2025
                                    </p>
                                    <h2 className="mt-2 font-['Syne',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white">
                                        The Collection
                                    </h2>
                                    <p className="mt-2 font-mono text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                                        {isLoading
                                            ? 'Syncing the latest releases…'
                                            : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'piece' : 'pieces'} curated from independent designers`}
                                    </p>
                                </div>

                                {/* High-Contrast Search Bar */}
                                <label className="flex min-h-12 w-full items-center gap-3 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 px-4 sm:max-w-sm shadow-sm backdrop-blur-sm transition-colors focus-within:border-neutral-950 dark:focus-within:border-white">
                                    <svg aria-hidden="true" className="h-4 w-4 shrink-0 text-neutral-500 dark:text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="11" cy="11" r="7" />
                                        <path d="m16 16 4 4" />
                                    </svg>
                                    <input
                                        type="search"
                                        value={search}
                                        onChange={event => setSearch(event.target.value)}
                                        placeholder="Search by title or aesthetic..."
                                        aria-label="Search products"
                                        className="w-full bg-transparent text-sm text-neutral-900 dark:text-white outline-none placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
                                    />
                                    {search && (
                                        <button
                                            type="button"
                                            onClick={() => setSearch('')}
                                            aria-label="Clear search"
                                            className="font-mono text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </label>
                            </div>

                            {/* Product Grid / States */}
                            {error ? (
                                <div className="py-24 text-center">
                                    <p className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
                                        {error}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={loadProducts}
                                        className="mt-6 inline-flex min-h-11 items-center rounded-full bg-neutral-950 dark:bg-white px-7 font-mono text-xs uppercase tracking-widest text-white dark:text-neutral-950 transition-colors hover:bg-[#8b6e38] dark:hover:bg-[#d9bd78]"
                                    >
                                        Try again
                                    </button>
                                </div>
                            ) : isLoading ? (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {Array.from({ length: 4 }, (_, index) => (
                                        <div key={index} className="animate-pulse rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40 p-4">
                                            <div className="aspect-[4/5] rounded-xl bg-neutral-200 dark:bg-neutral-800" />
                                            <div className="mt-4 h-5 w-2/3 rounded bg-neutral-200 dark:bg-neutral-800" />
                                            <div className="mt-2.5 h-3.5 w-full rounded bg-neutral-100 dark:bg-neutral-800/60" />
                                        </div>
                                    ))}
                                </div>
                            ) : filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {filteredProducts.map(product => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="py-24 text-center">
                                    <p className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-neutral-950 dark:text-white">
                                        {search ? 'No pieces match your search' : 'The archive is being prepared'}
                                    </p>
                                    <p className="mx-auto mt-3 max-w-md font-mono text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                                        {search
                                            ? 'Try searching for different keywords or clear your query to view the full collection.'
                                            : 'Check back soon for upcoming drops from independent creators.'}
                                    </p>
                                </div>
                            )}
                        </section>

                        {/* ── Footer ── */}
                        <footer id="footer" className="border-t border-neutral-300/80 dark:border-neutral-800/90 px-5 py-6 sm:px-8 sm:py-8 lg:px-12">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-neutral-950 dark:text-white">Neo Paradox</span>
                                    <span>·</span>
                                    <span>2025 Edition</span>
                                </div>
                                <div className="flex items-center gap-6">
                                    <a 
                                        href={instagramUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                                    >
                                        instagram
                                    </a>
                                    <a href="#top" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
                                        back to top ↑
                                    </a>
                                </div>
                            </div>
                        </footer>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Home
