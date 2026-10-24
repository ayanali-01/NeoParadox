import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { createProduct, deleteProduct, getSellerProduct, getAllProducts, getProductById } from '../services/product.api.js'
import { removeProduct, setProducts, setSellerProducts } from '../state/product.slice.js'





export const useProduct = () => {

    const dispatch = useDispatch()

    
    async function handleCreateProduct(formData) {
        const data = await createProduct(formData)
        return data.product
    }


    
    const handleGetSellerProduct = useCallback(async () => {
        const data = await getSellerProduct()
        dispatch(setSellerProducts(data.products))
        return data.products
    }, [dispatch])


    
    
    const handleGetAllProducts = useCallback(async () => {
        const data = await getAllProducts()
        dispatch(setProducts(data.products))
        return data.products
    }, [dispatch])

    
    
    const handleDeleteProduct = useCallback(async productId => {
        await deleteProduct(productId)
        dispatch(removeProduct(productId))
    }, [dispatch])


    const handleGetProductById = useCallback(async productId => {
        const data = await getProductById(productId)
        return data.product
    }, [])

   
   
   
    return { handleCreateProduct, handleGetSellerProduct, handleGetAllProducts, handleDeleteProduct, handleGetProductById }

    

}