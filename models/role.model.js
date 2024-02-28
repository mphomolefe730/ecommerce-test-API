import Mongoose from "mongoose";

const roleModelSchema = new Mongoose.Schema({
    role:{
        required: [true, 'product needs a name'],
        type: String
    }
})

export const roleModel = Mongoose.model("Role", roleModelSchema);