import mongoose from 'mongoose';
import priceSchema from './price.schema.js';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    
    description: { type: String, required: true },
    
    price: { type: priceSchema, required: true },
    
     seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    
    images: [
        {
            url: {
                type: String,
                required: true
            }
        }
    ]

});

const productModel = mongoose.model('Product', productSchema);
export default productModel;