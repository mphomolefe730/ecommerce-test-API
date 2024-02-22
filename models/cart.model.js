import { ObjectId } from 'mongodb';
import Mongoose from 'mongoose';

const cartModelSchema = new Mongoose.Schema({
    userId:{
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    items:[{
        productId: {
            type: ObjectId,
            required: true,
            ref: 'Product',
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },price:{
            type:Number,
            required:true
        }
    }]
})

export const cartModel = Mongoose.model("Cart", cartModelSchema);