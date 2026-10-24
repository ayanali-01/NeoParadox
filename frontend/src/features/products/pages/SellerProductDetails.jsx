import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useProduct } from '../hook/useProduct'

const formatPrice = price => {
    const amount = Number(price?.amount)
    return `${price?.currency || ''} ${Number.isFinite(amount) ? amount.toLocaleString() : '—'}`.trim()
}

const SellerProductDetails = () => {
    const { productId } = useParams()
    const navigate = useNavigate()
    const { handleDeleteProduct, handleGetSellerProduct } = useProduct()
    const [product, setProduct] = useState(null)
    const [selectedImage, setSelectedImage] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        let isCurrent = true

        const loadProduct = async () => {
            setIsLoading(true)
            setError('')
            setProduct(null)
            setSelectedImage(0)
            try {
                const sellerProducts = await handleGetSellerProduct()
                const result = sellerProducts.find(sellerProduct => sellerProduct._id === productId)
                if (isCurrent && result) setProduct(result)
                if (isCurrent && !result) setError('This listing could not be found in your vault.')
            } catch (loadError) {
                console.error('Failed to load seller product details', loadError)
                if (isCurrent) setError('Your listing could not be loaded. Please try again.')
            } finally {
                if (isCurrent) setIsLoading(false)
            }
        }

        loadProduct()
        return () => { isCurrent = false }
    }, [handleGetSellerProduct, productId])

    const handleRemoveListing = async () => {
        const shouldDelete = window.confirm(`Remove "${product.title}" from your vault? This cannot be undone.`)
        if (!shouldDelete) return

        setIsDeleting(true)
        setError('')
        try {
            await handleDeleteProduct(product._id)
            navigate('/seller/dashboard')
        } catch (deleteError) {
            console.error('Failed to delete seller product', deleteError)
            setError('We couldn’t remove this listing. Please try again.')
            setIsDeleting(false)
        }
    }

    const images = product?.images || []
    const imageUrl = images[selectedImage]?.url || images[0]?.url || '/auth-editorial.jpg'

    if (isLoading || !product) {
        return (
            <main className="flex min-h-screen flex-col bg-[#080810] px-5 text-white/90 sm:px-8 lg:px-14" style={{ fontFamily: "'Inter', sans-serif" }}>
                <header className="flex items-center justify-between border-b border-white/10 py-6">
                    <Link to="/seller/dashboard" className="font-serif text-xs uppercase tracking-[0.32em] text-[#c9a84c]">NeoParadox</Link>
                    <Link to="/seller/dashboard" className="text-xs uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-[#c9a84c]">Your vault</Link>
                </header>
                <section className="flex flex-1 flex-col items-center justify-center py-20 text-center">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a84c]">{isLoading ? 'Opening your archive' : 'Listing unavailable'}</p>
                    <h1 className="mt-4 max-w-xl font-serif text-4xl font-light sm:text-5xl">
                        {isLoading ? 'Gathering the details.' : error || 'This listing could not be found.'}
                    </h1>
                    {!isLoading && (
                        <Link to="/seller/dashboard" className="mt-8 min-h-12 border-b border-[#c9a84c]/60 pb-3 text-xs uppercase tracking-[0.2em] text-[#c9a84c] hover:text-white">
                            Return to your vault
                        </Link>
                    )}
                </section>
            </main>
        )
    }

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />
            <main className="min-h-screen bg-[#080810] text-white/90 selection:bg-[#c9a84c]/30" style={{ fontFamily: "'Inter', sans-serif", backgroundImage: 'radial-gradient(ellipse at 85% 12%, rgba(139,92,246,0.08), transparent 35%)' }}>
                <header className="border-b border-white/10">
                    <nav className="flex items-center justify-between px-5 py-6 sm:px-8 lg:px-14" aria-label="Seller product navigation">
                        <Link to="/seller/dashboard" className="font-serif text-xs uppercase tracking-[0.32em] text-[#c9a84c]">NeoParadox</Link>
                        <Link to="/seller/dashboard" className="inline-flex min-h-11 items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-[#c9a84c]">
                            <span aria-hidden="true">←</span> Your vault
                        </Link>
                    </nav>
                </header>

                <div className="mx-auto max-w-7xl px-5 pb-16 pt-9 sm:px-8 sm:pb-24 sm:pt-12 lg:px-14">
                    <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-11 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9a84c]">Seller archive · Listing details</p>
                            <h1 className="mt-2 font-serif text-4xl font-light sm:text-5xl">Your listing</h1>
                        </div>
                        <span className="inline-flex w-fit items-center gap-2 border border-[#c9a84c]/25 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[#c9a84c]">
                            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#c9a84c]" /> In your archive
                        </span>
                    </div>

                    {error && <p role="alert" className="mb-6 border border-red-400/30 bg-red-400/5 px-4 py-3 text-sm text-red-300">{error}</p>}

                    <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16 xl:gap-24">
                        <section aria-label="Listing images">
                            <div className="aspect-[4/5] overflow-hidden border border-white/10 bg-[#0f0f18]">
                                <img src={imageUrl} alt={product.title} className="h-full w-full object-cover" />
                            </div>
                            {images.length > 1 && (
                                <div className="mt-4 grid grid-cols-5 gap-3 sm:grid-cols-7" aria-label="Choose listing image">
                                    {images.map((image, index) => (
                                        <button
                                            key={`${image.url}-${index}`}
                                            type="button"
                                            onClick={() => setSelectedImage(index)}
                                            aria-label={`View listing image ${index + 1}`}
                                            aria-pressed={selectedImage === index}
                                            className={`aspect-square overflow-hidden border transition-colors ${selectedImage === index ? 'border-[#c9a84c]' : 'border-white/10 hover:border-[#c9a84c]/50'}`}
                                        >
                                            <img src={image.url} alt="" className="h-full w-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </section>

                        <section className="flex flex-col pt-1 lg:pt-8">
                            <p className="text-[10px] uppercase tracking-[0.28em] text-white/40">The piece you shared</p>
                            <h2 className="mt-4 font-serif text-5xl font-light leading-[1.02] text-white sm:text-6xl">{product.title}</h2>
                            <p className="mt-7 text-xl font-light tracking-[0.12em] text-[#c9a84c]">{formatPrice(product.price)}</p>

                            <div className="my-9 border-y border-white/10 py-7 sm:my-11 sm:py-9">
                                <h3 className="text-[10px] uppercase tracking-[0.22em] text-white/45">Description</h3>
                                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-white/70 sm:text-base sm:leading-8">{product.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-7">
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">Listing status</p>
                                    <p className="mt-2 text-sm text-white/75">In your vault</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">Gallery images</p>
                                    <p className="mt-2 text-sm text-white/75">{images.length} {images.length === 1 ? 'image' : 'images'}</p>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link to={`/product/${product._id}`} className="inline-flex min-h-12 flex-1 items-center justify-center border border-[#c9a84c]/50 px-5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#c9a84c] transition-colors hover:bg-[#c9a84c]/10">
                                    View buyer page <span aria-hidden="true" className="ml-3">↗</span>
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleRemoveListing}
                                    disabled={isDeleting}
                                    className="inline-flex min-h-12 flex-1 items-center justify-center border border-red-400/30 px-5 text-[10px] font-medium uppercase tracking-[0.2em] text-red-300 transition-colors hover:border-red-400/70 hover:bg-red-400/10 disabled:cursor-wait disabled:opacity-50"
                                >
                                    {isDeleting ? 'Removing…' : 'Remove listing'}
                                </button>
                            </div>
                            <p className="mt-4 text-xs leading-5 text-white/35">Removing a listing is permanent and takes it out of the marketplace.</p>
                        </section>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SellerProductDetails
