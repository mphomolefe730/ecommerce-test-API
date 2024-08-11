import { userModel } from "../models/user.model.js";
import Express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { environment } from "../environments.js";
import { CartService } from './cart.service.js';
import { roleModel } from "../models/role.model.js";
import { businessLogModel } from "../models/businessLog.model.js";
import { businessModel } from "../models/business.model.js";
import { userVerificationLogModel } from '../models/userLog.model.js';
import { EmailService } from '../services/email.service.js';
import { welcomeEmail } from "../templates/welcome.email.js";

const cartService = new CartService();
const emailService = new EmailService();

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
                        role: data[0].role,
                        cartId: data[0].cartId,
                    },environment.JWTSecretkey,{
                        'expiresIn':'12h'
                    })
                    return res.status(200).json({
                        message: 'login successful',
                        token,
                        profileImage:data[0].profileImage
                    });
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: `failed to access user`
            });
        }
    }
    async createNewUser(req,res){
        try {
            const {email} = req.body
            const existingUser = await this.getUserByEmail(email);
            const OTP = Math.floor(Math.random() * 9000) + 1000;
            if (!existingUser) {
                const {
                    name,surname,email,number,hashedPassword,role,
                     profileImage} = req.body;
                const tempPassword = await bcrypt.hash(hashedPassword,10);
                let user = new userModel({
                    name:name,
                    surname:surname,
                    email:email,
                    number:number,
                    role:role,
                    hashedPassword: tempPassword,
                    profileImage: profileImage,
                    verified: false
                });
                await user.save().then(async (result)=>{
                    const roleForSeller = await roleModel.find({
                        "role":{$regex:"seller", $options: "i" }
                    });
                    //seller dont get a cart
                    if (roleForSeller[0]._id != role){
                        await cartService.createNewCart({
                            userId: user._id,
                            items: [],
                        },).then((data)=>{
                            const { _id } = data;
                            user.cartId = _id;
                            user.save();
                            //return res.status(201).json({message: "success"});
                        });
                    }
                    await userVerificationLogModel.create({userId:user._id,otp:OTP});
                    await emailService.sendEmail(user.email,"E-commerce Connect Verification",`<h1>${OTP}</h1>`);
                    return res.status(201).json({message: "success"});
                });
            };
            if (existingUser) res.status(400).json({ message:'user email already exist'});
        } catch (error) {
            console.error(error);
            return res.status(500).json(`failed to add user`);
        }
    }
    async getAllUsers(req,res){
        const page = req.body.page || 0;
        const amountToSend = 10;
        const listOfUsers = await userModel.find().skip(page * amountToSend).limit(amountToSend);
        if (!listOfUsers) return res.status(404).json(`users not found on database`)
        return listOfUsers;
    }
    async getUserById(id,req,res){
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
    async searchForUser(req,res){
        try {
            const page = req.body.page || 0;
            const amountToSend = 10;
            const { search } = req.body;
            const listOfSearchedUsers = await userModel.find({
                'name': {
                    $regex: search,
                    $options: "i" 
                }
            }).skip(page * amountToSend).limit(amountToSend);
            return res.send(listOfSearchedUsers);
        } catch (error) { 
            console.log(error);
            return res.send(error);            
        }
    }

    async getUserBySellerId(id,req,res){
        try {
            const foundUser = await userModel.findById(id);
            if (!foundUser) return res.status(404).json({
                status: "error",
                message: `user with id(${id}) not found`
            });
            const member = await businessLogModel.find({"memberId": id }, 'business').populate({
                path:"business",
                select: 'businessDescription businessName profileImage'
            });
            if (member) {
                const businessInfo = await businessModel.find({businessName: member[0].business.businessName},'businessDescription businessName profileImage');
                return res.status(200).json({status:"success",type: "business",message: businessInfo});
            }
            return res.status(200).json({status:"success",type: "seller",message:foundUser}); 
        } catch (error) {
            console.error(error);
            const { id } = req.params;
            return res.status(500).json(`failed to get user with id(${id})`)  
        }
    }

    async searchForSeller(req,res){
        try {
            const page = req.body.page || 0;
            const amountToSend = 10;
            const { search } = req.body;
            let stringListOfSellers=[];
            let filterListSeller = [];
            let filterListBuyers = [];
            const roleForSeller = await roleModel.find({
                role:"seller"
            });
             // get all users matching that search
            let listOfSearchedUsers = await userModel.find({
                'name': {
                    $regex: search,
                    $options: "i" 
                },'role':{
                    $in:roleForSeller[0]._id
                }
            }).skip(page * amountToSend).limit(amountToSend);
            // get the ids of all the seller
            listOfSearchedUsers.forEach((seller)=>{
                stringListOfSellers.unshift(seller._id);
            }) 
            // get all the businesses which the sellers own
            const member = await businessLogModel.find({
                "memberId":{
                    "$all": stringListOfSellers 
                }
            }, 'business memberId').populate({
                path:"business",
                select: 'businessDescription businessName _id profileImage'
            }); 
            //search for business strictly now
            const rawBusiness = await businessModel.find({
                "businessName":{
                    $regex: search,
                    $options: "i" 
                }
            },"businessName businessDescription _id profileImage")
            //create a new array with sellers without businesses
            listOfSearchedUsers.forEach((seller)=>{
                member.forEach((business)=>{
                    if(business.memberId == seller._id) filterListSeller.unshift(seller);
                });
            })
            //fixing structure for frontend,just to get business only - remove log information
            member.forEach(log=>filterListBuyers.unshift(log.business))
            //remove duplicates raw and add filtered list to memeber
            filterListBuyers.filter((businesses)=> businesses !== rawBusiness);
            rawBusiness.forEach(b=>filterListBuyers.unshift(b))
            return res.status(200).json({
                status:'success',
                seller: filterListSeller,
                businesses: filterListBuyers
            });
        } catch (error) { 
            console.log(error);
            return res.send(error);            
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
    async verifyUser(id,otp,res){
        const userLog = await userVerificationLogModel.findOne({userId:id});
        if (!userLog) return res.status(404).json({status:"Error",message:"Failed to active user"});
        if (userLog.otp != otp) return res.status(404).json({status:"error",message:"OTP does not match"});
        
        const timeCreated = new Date(userLog.createdAt);
        const oneHourLater = new Date(timeCreated);
        oneHourLater.setHours(oneHourLater.getHours() + 1);
        const now = new Date();
        
        if (now > oneHourLater){
            const newOTP = Math.floor(Math.random() * 9000) + 1000;
            await userVerificationLogModel.findByIdAndDelete(userLog._id);
            await userVerificationLogModel.create({ userId:userLog.userId, otp:newOTP });
            return res.status(400).json({status:"error",message:"OTP has expired, new OTP sent to your email"});
        }
        const userInformation = await userModel.findOne({_id:id});
        await userVerificationLogModel.findByIdAndDelete(userLog._id);
        await userModel.findByIdAndUpdate(id,{verified:true});
        await emailService.sendEmail(userInformation.email,"Welcome To E-commerce Connect",welcomeEmail(userInformation.name));
        return res.status(200).json({status:"success",message:"account now actived"});
    }
}