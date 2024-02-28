import { userModel } from "../models/user.model.js";

export class UserService{
    async createNewUser(req,res){
        try {
            const user = await userModel.create(req.body);
            return user;
        } catch (error) {
            console.error(error);
            res.status(500).json(`failed to add user`);
        }
    }
    async getAllUsers(res){
        const listOfUsers = await userModel.find();
        if (!listOfUsers) return res.status(404).json(`users not found on database`)
        return listOfUsers;
    }
    async getUserById(id,res){
        try {
            const foundUser = await userModel.findById(id);
            if (!foundUser) return res.status(404).json(`user with id(${id}) not found`);
            return foundUser;
        } catch (error) {
            console.error(error);
            const { id } = req.params;
            res.status(500).json(`failed to get user with id(${id})`)  
        }
    }
    async editUserInformation(id,req,res){
        try{
            const modifyInformation = await userModel.findByIdAndUpdate(id,req.body);
            if (!modifyInformation) return res.status(404).json(`user with id(${id}) not found`);
            const updatedInformation = await userModel.findById(id);
            return(updatedInformation);
        }catch(error){
            console.error(error);
            const { id } = req.params;
            res.status(500).json(`failed to update user with id(${id})`); 
        }
    }
}