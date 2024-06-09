import { ObjectId } from "mongodb";
import Mongoose from "mongoose";

const chatSchema = new Mongoose.Schema(
    {
        chat:{
            type:String
        },
        sender:{
            type:ObjectId,
            ref:"User"
        }
    },{
        timestamps:true
    }
)

export const chatModel = Mongoose.model('Chat',chatSchema);