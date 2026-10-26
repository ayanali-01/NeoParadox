import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useProduct } from '../hook/useProduct.js'
import { useCart } from '../../cart/hook/useCart.js'

const formatPrice = price => {
    const amount = Number(price?.amount)
    return `${price?.currency || ''} ${Number.isFinite(amount) ? amount.toLocaleString() : '—'}`.trim()
}

const Productdetails = () => {
    const { productId } = useParams()
    const navigate = useNavigate()
    const { handleGetProductById } = useProduct()
    const { handleAddItem } = useCart()
    const [product, setProduct] = useState(null)
    const [selectedImage, setSelectedImage] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [isAdding, setIsAdding] = useState(false)
    const [feedback, setFeedback] = useState(null)

    const onAddToCart = async () => {
        if (!product?._id || isAdding) return
        setIsAdding(true)
        setFeedback(null)
        try {
            await handleAddItem({ productId: product._id })
            setFeedback({ type: 'success', message: 'Added to your cart' })
            setTimeout(() => setFeedback(null), 3000)
        } catch (addError) {
            console.error('Failed to add item to cart', addError)
            const msg = addError?.response?.data?.message || 'Failed to add item to cart. Please try again.'
            setFeedback({ type: 'error', message: msg })
            setTimeout(() => setFeedback(null), 3500)
        } finally {
            setIsAdding(false)
        }
    }

    useEffect(() => {
        let isCurrent = true

        const loadProduct = async () => {
            setIsLoading(true)
            setError('')
            setProduct(null)
            setSelectedImage(0)
            try {
                const result = await handleGetProductById(productId)
                if (isCurrent) setProduct(result)
            } catch (loadError) {
                console.error('Failed to load product details', loadError)
                if (isCurrent) setError('This piece could not be found. It may have been removed.')
            } finally {
                if (isCurrent) setIsLoading(false)
            }
        }

        loadProduct()
        return () => { isCurrent = false }
    }, [handleGetProductById, productId])

    const images = product?.images || []
    const imageUrl = images[selectedImage]?.url || images[0]?.url || '/auth-editorial.jpg'

    if (isLoading || error) {
        return (
            <main className="flex min-h-screen flex-col bg-[#f5f2eb] px-5 text-[#24251f] sm:px-8 lg:px-14" style={{ fontFamily: "'Inter', sans-serif" }}>
                <header className="flex items-center justify-between border-b border-[#24251f]/15 py-5">
                    <Link to="/" className="font-serif text-2xl tracking-[0.18em] sm:text-3xl">N<span className="text-[#9b8050]">/</span>P</Link>
                    <Link to="/" className="text-xs uppercase tracking-[0.16em] text-[#69685f] hover:text-[#70582f]">Back to collection</Link>
                </header>
                <section className="flex flex-1 flex-col items-center justify-center py-20 text-center">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#80683c]">{isLoading ? 'Loading the details' : 'A little detour'}</p>
                    <h1 className="mt-4 max-w-xl font-serif text-4xl font-light sm:text-5xl">
                        {isLoading ? 'Finding your next favorite.' : error}
                    </h1>
                    {error && (
                        <button type="button" onClick={() => navigate('/')} className="mt-8 min-h-12 border-b border-[#8b6e38]/60 px-2 text-sm uppercase tracking-[0.16em] text-[#70582f] hover:text-[#24251f]">
                            Return to the collection
                        </button>
                    )}
                </section>
            </main>
        )
    }

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />
            <main className="min-h-screen bg-[#f5f2eb] text-[#24251f] selection:bg-[#d8c9a7]/60" style={{ fontFamily: "'Inter', sans-serif" }}>
                <header className="border-b border-[#24251f]/15">
                    <nav className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-14" aria-label="Product navigation">
                        <Link to="/" className="font-serif text-2xl tracking-[0.18em] sm:text-3xl">N<span className="text-[#9b8050]">/</span>P</Link>
                        <Link to="/" className="inline-flex min-h-11 items-center gap-3 text-xs uppercase tracking-[0.14em] text-[#69685f] transition-colors hover:text-[#70582f] sm:text-sm sm:tracking-[0.18em]">
                            <span aria-hidden="true">←</span> The collection
                        </Link>
                    </nav>
                </header>

                <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-12 lg:px-14">
                    <p className="mb-7 text-[11px] uppercase tracking-[0.22em] text-[#80683c] sm:mb-10">A considered find · Product details</p>
                    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:gap-24">
                        <section aria-label="Product images">
                            <div className="aspect-[4/5] overflow-hidden bg-[#e7e2d8]">
                                <img src={imageUrl} alt={product.title} className="h-full w-full object-cover" />
                            </div>
                            {images.length > 1 && (
                                <div className="mt-4 grid grid-cols-5 gap-3 sm:grid-cols-7" aria-label="Choose product image">
                                    {images.map((image, index) => (
                                        <button
                                            key={`${image.url}-${index}`}
                                            type="button"
                                            onClick={() => setSelectedImage(index)}
                                            aria-label={`View product image ${index + 1}`}
                                            aria-pressed={selectedImage === index}
                                            className={`aspect-square overflow-hidden border transition-colors ${selectedImage === index ? 'border-[#8b6e38]' : 'border-[#24251f]/10 hover:border-[#8b6e38]/50'}`}
                                        >
                                            <img src={image.url} alt="" className="h-full w-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </section>

                        <section className="flex flex-col pt-1 lg:pt-8">
                            <p className="text-xs uppercase tracking-[0.22em] text-[#80683c]">From an independent seller</p>
                            <h1 className="mt-4 font-serif text-5xl font-light leading-[1.02] tracking-[-0.025em] sm:text-6xl lg:text-7xl">{product.title}</h1>
                            <div className="mt-7 flex items-center gap-5">
                                <span className="h-px w-12 bg-[#9b8050]" />
                                <p className="text-base font-medium tracking-wide text-[#70582f]">{formatPrice(product.price)}</p>
                            </div>

                            <div className="my-9 border-y border-[#24251f]/15 py-7 sm:my-11 sm:py-9">
                                <h2 className="text-xs uppercase tracking-[0.2em] text-[#69685f]">About this piece</h2>
                                <p className="mt-4 whitespace-pre-line text-base leading-8 text-[#4c493d] sm:text-lg sm:leading-9">{product.description}</p>
                            </div>

                            <div className="flex items-start gap-4">
                                <span aria-hidden="true" className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#9b8050]/40 font-serif text-lg text-[#80683c]">N</span>
                                <div>
                                    <p className="text-sm font-medium text-[#24251f]">Thoughtfully listed</p>
                                    <p className="mt-1 max-w-sm text-sm leading-6 text-[#69685f]">Discover original finds from independent sellers in the NeoParadox collection.</p>
                                </div>
                            </div>

                            <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row">
                                <button
                                    type="button" 
                                    onClick={onAddToCart}
                                    disabled={isAdding}
                                    className="inline-flex min-h-14 flex-1 items-center justify-center gap-3 bg-[#24251f] px-6 text-xs font-medium uppercase tracking-[0.18em] text-[#f5f2eb] transition-colors hover:bg-[#70582f] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isAdding ? 'Adding to cart...' : feedback?.type === 'success' ? 'Added to cart ✓' : 'Add to cart'}
                                </button>
                                <button
                                    type="button"
                                    onClick={onAddToCart}
                                    disabled={isAdding}
                                    className="inline-flex min-h-14 flex-1 items-center justify-center gap-3 border border-[#24251f]/25 px-6 text-xs font-medium uppercase tracking-[0.18em] text-[#24251f] transition-colors hover:border-[#70582f] hover:text-[#70582f] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Buy now <span aria-hidden="true">↗</span>
                                </button>
                            </div>
                            {feedback ? (
                                <p className={`mt-4 text-xs leading-5 transition-opacity ${feedback.type === 'error' ? 'text-red-700 font-medium' : 'text-[#80683c]'}`}>
                                    {feedback.message}
                                </p>
                            ) : (
                                <p className="mt-4 text-xs leading-5 text-[#858278]">Thoughtfully packaged and insured for delivery.</p>
                            )}
                        </section>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Productdetails
