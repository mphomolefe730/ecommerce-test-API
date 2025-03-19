import Mongoose from "mongoose";
import { ObjectId } from "mongodb";

const reviewSchema = new Mongoose.Schema(
    {
        orderId:{
            type: ObjectId,
            ref: 'Inventory',
            require: true
        },
        orderStatus:{
            type: String,
            require: true
        },
        productId:{
            type: ObjectId,
            require: true,
            ref: 'Product'
        },
        rank:{
            type: Number,
            require: true,
        },
        comment:{
            type: String,
            require: true,
        },
        user: {
            type: ObjectId,
            require: true,
            ref: 'User'
        },
        parentComment:{
            Type: ObjectId,
        },
        childComments:[{
            comment:{
                type: ObjectId,
            }
        }]
    },{
        timestamps: true
    }
);

export const reviewModel = Mongoose.model('Review', reviewSchema);
