import Mongoose from "mongoose";
import { ObjectId } from "mongodb";

const businessTipsModelSchema = new Mongoose.Schema(
    {
        title:{
            type:String,
            require:true
        },
        description:{
            type:String,
            require:true
        },
        link:{
            type:String,
            require:true
        },
        ratings:{
            type:Number,
            require:true
        },
        comments:[{
            type:ObjectId,
            require:false,
            ref: "BusinessTipComment"
        }]
    },{
        timestamps:true
    }
)

export const businessTipsModel = Mongoose.model("BusinessTip",businessTipsModelSchema);