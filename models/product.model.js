import Mongoose from "mongoose";

const productModelSchema = new Mongoose.Schema({
    name: {
        required: [true, 'product needs a name'],
        type: String
    },
    price:{
        required: [true, 'product needs a price'],
        type: Number
    },
    image:{
        required: [true, 'product image missing'],
        type: String
    },
    description:{
        required: [true, 'product needs a description'],
        type: String
    },
    stock:{
        required: [true, 'product stock not indicated'],
        type: Number
    }},
    {
        timestamp:true
    }
)

//this helps locate the values give and place in a catergory called products
export const productModel = Mongoose.model("Product", productModelSchema);