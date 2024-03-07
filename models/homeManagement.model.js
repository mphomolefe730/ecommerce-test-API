import Mongoose from 'mongoose'

const homeManagementSchema = new Mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        required:true
    }
})

export const homeManagementModel = Mongoose.model("Categorie", homeManagementSchema)