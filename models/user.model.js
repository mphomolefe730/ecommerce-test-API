import { ObjectId } from "mongodb";
import Mongoose from "mongoose";

const userModelSchema = new Mongoose.Schema({
    name:{
        require:[true,'user first name is required'],
        type: String
    },
    surname:{
        require:[true,'user second name is required'],
        type: String
    },
    email:{
        require:[true,'user email is required'],
        type: String,
        unique: [true, "user email exist"]
    },
    businessName:{
        require:[true, 'business Name need'],
        type: String
    },
    businessDescription:{
        require:[true, 'business Description needed'],
        type:String
    },
    number:{
        require:[true,'user number is required'],
        type: Number
    },
    hashedPassword:{
        require: [true, 'user password is required'],
        type: "string"
    },
    role:{
        type: ObjectId,
        required: true,
        ref: 'Role'
    },
    cartId:{
        type: ObjectId,
        require: false,
        ref: 'Cart'
    }
})

export const userModel = Mongoose.model("User",userModelSchema)