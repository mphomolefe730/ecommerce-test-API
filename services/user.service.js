import { userModel } from "../models/user.model.js";
import Express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { environment } from "../environments.js";

export class UserService{
    async logInUser(req,res){ 
        try {
            const {email, hashedPassword} = req.body;
            await this.getUserByEmail(email).then(async (data)=>{
                if (!data) return res.send({ message:`user with email: ${email} not found`});
                const userPassword = await bcrypt.compare(hashedPassword,data[0].hashedPassword)
                if (!userPassword) return res.send({ message:`user password doesnt match`});
                if (userPassword){
                    const token = await jwt.sign({
                        userId: data[0]._id,
                        name:data[0].name,
                        email: email
                    },environment.JWTSecretkey,{
                        'expiresIn':'12h'
                    })
                    return res.status(200).json({
                        message: 'login successful',
                        userName: data[0].name,
                        token
                    });
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json(`failed to access user`);
        }
    }
    async createNewUser(req,res){
        try {
            const {email} = req.body
            const existingUser = await this.getUserByEmail(email);
            if (!existingUser) {
                const {name,surname,email,number,hashedPassword,role} = req.body;
                const tempPassword = await bcrypt.hash(hashedPassword,10);
                let user = new userModel({
                    name:name,
                    surname:surname,
                    email:email,
                    number:number,
                    role:role,
                    hashedPassword: tempPassword
                })
                user.save().then(result=> res.send(`user(s) added to database`));
                console.log(user)
                return user;
            };
            if (existingUser) res.send({ message:'user email already exist'});
        } catch (error) {
            console.error(error);
            return res.status(500).json(`failed to add user`);
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
            return res.status(500).json(`failed to get user with id(${id})`)  
        }
    }
    async getUserByEmail(userEmail,res){
        try {
            let existingUseEmail = await userModel.find({
                'email':{
                    $in:userEmail
                }
            })
            if (existingUseEmail.length!=0) return existingUseEmail;
        } catch (error) {
            console.log(error);
            Express.response.send('error getting email')
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
            return res.status(500).json(`failed to update user with id(${id})`); 
        }
    }
}