import { ObjectId } from "mongodb";
import Mongoose from "mongoose";

const inventorySchema = new Mongoose.Schema({
    user:{
        required:true,
        type: ObjectId,
        ref:"User"
    },
    seller:{
        type:ObjectId,
        ref: "User",
        required:true
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
        },_id:false
    }],
    total:{
        type:Number
    },
    status:{
        type:String,
        required:true
    }},
    {
        timestamp:true
    }
)

export const inventoryModel = Mongoose.model("Inventory",inventorySchema);