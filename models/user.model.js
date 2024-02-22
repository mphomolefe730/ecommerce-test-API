import Mongoose from "mongoose";

const userModelSchema = Mongoose.Schema({
    name:{
        require:[true,'user first name is required'],
        type: String
    },
    surname:{
        require:[true,'user second name is required'],
        type: String
    },
    email:{
        require:[true,'user email is required'],
        type: String
    },
    number:{
        require:[true,'user number is required'],
        type: Number
    },
})

export const userModel = Mongoose.model("User",userModelSchema)