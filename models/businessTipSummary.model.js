import Mongoose from "mongoose";
import { ObjectId } from "mongodb";

const businessTipsSummaryModelSchema = new Mongoose.Schema(
    {
        tipTitle:{
            type:String,
            require:true
        },
        tipDescription:{
            type:String,
            require:true
        },
        tipThumbnail:{
            type:String,
            require:true
        },businessTipId:{
            type:ObjectId,
            ref:"BusinessTip"
        }
    },{
        timestamps:true
    }
);

export const businessTipsSummaryModel = Mongoose.model("BusinessTipsSummary",businessTipsSummaryModelSchema)