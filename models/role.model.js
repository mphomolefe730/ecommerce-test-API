import Mongoose from "mongoose";

const roleModelSchema = new Mongoose.Schema({
    role:{
        required: [true, 'role needs a name'],
        type: String
    }
})

export const roleModel = Mongoose.model("Role", roleModelSchema);