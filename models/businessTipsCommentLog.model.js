import Mongoose from "mongoose";
import { ObjectId } from "mongodb";

const businessTipCommentLogSchema = new Mongoose.Schema(
    {
        userId:{
            type:ObjectId,
            ref:"User",
            require:true
        },
        comment:{
            type:String,
            require:true
        }
    },{
        timestamps:true
    }
)

export const businessTipCommentLogModel = new Mongoose.model("BusinessTipComment",businessTipCommentLogSchema)