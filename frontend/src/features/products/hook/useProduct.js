import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { createProduct, getSellerProduct, getAllProducts } from '../services/product.api.js'
import { setProducts, setSellerProducts } from '../state/product.slice.js'





export const useProduct = () => {

    const dispatch = useDispatch()

    async function handleCreateProduct(formData) {
        const data = await createProduct(formData)
        return data.product
    }


     async function handleGetSellerProduct() {
        const data = await getSellerProduct()
        dispatch(setSellerProducts(data.products))
        return data.products
    }


    const handleGetAllProducts = useCallback(async () => {
        const data = await getAllProducts()
        dispatch(setProducts(data.products))
        return data.products
    }, [dispatch])


     
   
   

    return { handleCreateProduct,handleGetSellerProduct, handleGetAllProducts }

}