import Mongoose from "mongoose";

const mbumbusBakesReviewSchema = new Mongoose.Schema(
    {
        comment:{
            type: String,
            require: true,
        },
        fullName:{
            type: String,
            require: true,
        },
        orderId:{
            type: String,
            require: true
        },
        rating:{
            type: Number,
            require: true,
        },
        orderLocation:{
            type: String,
            require: true,
        }
    },{
        timestamps: true
    }
);

export const mbumbusBakesReviewModel = Mongoose.model('MbumbusBakesReview', mbumbusBakesReviewSchema);
   