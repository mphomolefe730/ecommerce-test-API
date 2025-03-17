import Mongoose from "mongoose";
import { ObjectId } from "mongodb";

const reviewSchema = new Mongoose.Schema(
    {
        orderStatus:{
            type: String,
            require: true
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
            require: true
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

export const reviewModel = Mongoose.model('review', reviewSchema);
