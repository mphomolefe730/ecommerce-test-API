import Mongoose from "mongoose";

const businessSchema = new Mongoose.Schema(
    {
        businessName:{
            type:String,
            required:true
        },
        businessDescription:{
            type:String,
            required:true
        },
        profileImage:{
            type:String,
            require:false
        }
    },
    {
        timestamps:true
    }
)
export const businessModel = new Mongoose.model("Businesse",businessSchema)