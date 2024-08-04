import Mongoose from "mongoose";
import { ObjectId } from "mongodb";

const businessLogSchema = new Mongoose.Schema(
    {
        business:{
            type:ObjectId,
            required: true,
            ref: "Businesse"
        },
        memberId:{
            type:ObjectId,
            required:true,
            ref: "User"
        },
        status:{
            type:ObjectId,
            required:true,
            ref: "businessUserStatus"
        },
        adminRoles:{
            type:Boolean,
            required:true
        }
    },{
        timestamps:true
    }

)
export const businessLogModel = new Mongoose.model('BusinessLog',businessLogSchema)