import Mongoose from "mongoose";

const businessUserStatusSchema = new Mongoose.Schema({
    role:{
        required: [true, 'Member Role is required'],
        type:String
    }
})

export const businessUserStatusModel = Mongoose.model("businessUserStatus",businessUserStatusSchema);