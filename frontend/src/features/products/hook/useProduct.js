import { useDispatch } from 'react-redux'





export const useProduct = () => {

    const dispatch = useDispatch()

    async function handleCreateProduct(formData) {
        const data = await createProduct(formData)
        return data.product
    }





    
        
    

    return { handleCreateProduct}

}