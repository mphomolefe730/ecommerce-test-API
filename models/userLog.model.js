import { ObjectId } from "mongodb";
import Mongoose from "mongoose";

const userVerificationLogSchema = new Mongoose.Schema(
    {
        userId:{
            require:true,
            type: ObjectId,
            ref: 'User'
        },
        otp:{
            require:true,
            type: Number
        },
    },{
        timestamps:true
    }
)

export const userVerificationLogModel = Mongoose.model("userVerificationLog",userVerificationLogSchema)