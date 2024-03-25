import Mongoose from "mongoose";

const annoucementSchema = new Mongoose.Schema({
    statusText:{
        type:String
    },
    status:{
        type:Boolean
    }
})

export const annoucementModel = Mongoose.model('Annoucement', annoucementSchema);