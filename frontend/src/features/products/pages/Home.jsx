import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useProduct } from '../hook/useProduct'

const ProductCard = ({ product }) => {
    const image = product.images?.[0]?.url || '/auth-editorial.jpg'

    return (
        <Link to={`/product/${product._id}`} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e4da]">
                <img
                    src={image}
                    alt={product.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
            </div>
            <div className="flex flex-col justify-between gap-2 pt-4 sm:flex-row sm:items-start sm:gap-4">
                <div className="min-w-0">
                    <h3 className="truncate font-serif text-2xl text-[#24251f] transition-colors group-hover:text-[#8b6e38]">
                        {product.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-base leading-relaxed text-[#69685f]">
                        {product.description}
                    </p>
                </div>
                <p className="shrink-0 pt-1 text-base font-medium tracking-wide text-[#70582f]">
                    {product.price?.currency} {Number(product.price?.amount || 0).toLocaleString()}
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
    const [isDarkMode, setIsDarkMode] = useState(() => window.localStorage.getItem('neoparadox-theme') === 'dark')

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
    }, [isDarkMode])

    const filteredProducts = products.filter(product => {
        const query = search.trim().toLowerCase()
        return !query || `${product.title} ${product.description}`.toLowerCase().includes(query)
    })

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />
            <main
                className="min-h-screen w-full bg-[#f5f2eb] text-[#24251f] selection:bg-[#d8c9a7]/60"
                data-theme={isDarkMode ? 'dark' : 'light'}
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                <header className="border-b border-[#24251f]/15">
                    <nav className="flex w-full items-center justify-between px-5 py-5 sm:px-8 lg:px-14" aria-label="Main navigation">
                        <Link to="/" className="font-serif text-2xl tracking-[0.18em] text-[#24251f] sm:text-3xl">
                            N<span className="text-[#9b8050]">/</span>P
                        </Link>
                        <div className="flex items-center gap-4 sm:gap-8">
                            <a href="#collection" className="text-xs uppercase tracking-[0.14em] text-[#69685f] transition-colors hover:text-[#24251f] sm:text-sm sm:tracking-[0.18em]">
                                Collection
                            </a>
                            {user?.role === 'seller' && (
                                <Link to="/seller/dashboard" className="text-xs uppercase tracking-[0.12em] text-[#69685f] transition-colors hover:text-[#70582f] sm:text-sm sm:tracking-[0.16em]">
                                    Seller studio
                                </Link>
                            )}
                            <span className="hidden text-sm text-[#69685f] md:block">
                                {user?.fullname || 'Welcome'}
                            </span>
                            <button
                                type="button"
                                onClick={() => setIsDarkMode(current => !current)}
                                aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} theme`}
                                aria-pressed={isDarkMode}
                                className="flex min-h-11 items-center gap-2 rounded-full border border-[#24251f]/20 px-3 text-sm text-[#4c493d] transition-colors hover:border-[#8b6e38]/60 hover:text-[#8b6e38] sm:gap-2.5 sm:px-4"
                            >
                                {isDarkMode ? (
                                    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                                        <circle cx="12" cy="12" r="4" />
                                        <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                                    </svg>
                                ) : (
                                    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />
                                    </svg>
                                )}
                                <span className="hidden sm:inline">{isDarkMode ? 'Light' : 'Dark'} mode</span>
                            </button>
                        </div>
                    </nav>
                </header>

                <section className="relative flex min-h-[390px] w-full items-center overflow-hidden border-b border-[#24251f]/10 px-5 py-16 sm:min-h-[480px] sm:px-8 lg:min-h-[540px] lg:px-14">
                    <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-1/2 h-[22rem] w-[22rem] -translate-y-1/2 rounded-full border border-[#9b8050]/20 sm:right-10 sm:h-[34rem] sm:w-[34rem]">
                        <div className="absolute inset-8 rounded-full border border-[#9b8050]/15 sm:inset-14" />
                    </div>
                    <div className="relative max-w-5xl">
                        <p className="mb-6 text-xs font-medium uppercase tracking-[0.24em] text-[#80683c] sm:text-sm sm:tracking-[0.3em]">
                            Independent makers · considered finds
                        </p>
                        <h1 className="max-w-5xl font-serif text-5xl font-light leading-[0.98] tracking-[-0.035em] text-[#24251f] sm:text-7xl md:text-8xl lg:text-[8.5rem]">
                            Good things,<br className="sm:hidden" /> made to <span className="italic text-[#8b6e38]">be found.</span>
                        </h1>
                        <p className="mt-7 max-w-xl text-base leading-7 text-[#69685f] sm:text-lg sm:leading-8">
                            Shop a growing collection of original pieces from independent sellers.
                        </p>
                        <a href="#collection" className="mt-8 inline-flex min-h-12 items-center gap-4 border-b border-[#8b6e38]/60 pb-2 text-sm font-medium uppercase tracking-[0.16em] text-[#4c493d] transition-colors hover:text-[#8b6e38] sm:text-base">
                            Explore the collection <span aria-hidden="true">↓</span>
                        </a>
                    </div>
                </section>

                <section id="collection" className="w-full scroll-mt-8 px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-16 lg:px-14">
                    <div className="mb-8 flex flex-col justify-between gap-6 border-t border-[#24251f]/15 pt-7 sm:mb-10 sm:flex-row sm:items-end sm:pt-9">
                        <div>
                            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#80683c] sm:text-sm sm:tracking-[0.25em]">The marketplace</p>
                            <h2 className="font-serif text-5xl font-light text-[#24251f] sm:text-6xl">The collection</h2>
                            <p className="mt-2 text-sm text-[#69685f] sm:text-base">
                                {isLoading ? 'Gathering the latest pieces…' : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'piece' : 'pieces'} to discover`}
                            </p>
                        </div>
                        <label className="flex min-h-12 w-full items-center gap-3 border-b border-[#24251f]/25 pb-3 sm:max-w-sm">
                            <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-[#69685f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="11" cy="11" r="7" />
                                <path d="m16 16 4 4" />
                            </svg>
                            <input
                                type="search"
                                value={search}
                                onChange={event => setSearch(event.target.value)}
                                placeholder="Search products"
                                aria-label="Search products"
                                className="w-full bg-transparent text-base text-[#24251f] outline-none placeholder:text-[#858278]"
                            />
                        </label>
                    </div>

                    {error ? (
                        <div className="py-24 text-center">
                            <p className="font-serif text-3xl text-[#24251f] sm:text-4xl">{error}</p>
                            <button
                                type="button"
                                onClick={loadProducts}
                                className="mt-5 min-h-12 border-b border-[#8b6e38]/60 pb-2 text-sm uppercase tracking-[0.18em] text-[#70582f] hover:text-[#24251f]"
                            >
                                Try again
                            </button>
                        </div>
                    ) : isLoading ? (
                        <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                            {Array.from({ length: 4 }, (_, index) => (
                                <div key={index} className="animate-pulse">
                                    <div className="aspect-[4/5] bg-[#e7e2d8]" />
                                    <div className="mt-5 h-6 w-2/3 bg-[#e7e2d8]" />
                                    <div className="mt-3 h-4 w-full bg-[#ece8df]" />
                                </div>
                            ))}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                            {filteredProducts.map(product => <ProductCard key={product._id} product={product} />)}
                        </div>
                    ) : (
                        <div className="py-24 text-center">
                            <p className="font-serif text-4xl font-light text-[#24251f] sm:text-5xl">
                                {search ? 'No pieces found' : 'The collection is taking shape'}
                            </p>
                            <p className="mx-auto mt-3 max-w-md text-base leading-7 text-[#69685f] sm:text-lg">
                                {search
                                    ? 'Try another search to find what you’re looking for.'
                                    : 'There are no listings just yet. Check back soon for something special.'}
                            </p>
                        </div>
                    )}
                </section>

                <footer className="border-t border-[#24251f]/15">
                    <div className="flex w-full flex-col gap-2 px-5 py-7 text-xs uppercase tracking-[0.16em] text-[#69685f] sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:text-sm lg:px-14">
                        <span>NeoParadox</span>
                        <span>Discover pieces from independent sellers</span>
                    </div>
                </footer>
            </main>
        </>
    )
}

export default Home