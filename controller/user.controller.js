import Express from "express";
import { Auth } from '../middleware/auth.js';
import { UserService } from "../services/user.service.js";

export const userLinkConnection = Express.Router();
let userServiceManager = new UserService();

userLinkConnection.post('/add', async (req,res)=>{
    const user = await userServiceManager.createNewUser(req,res);
})


userLinkConnection.post('/verify/:id/:otp', async (req,res)=>{
    const { id, otp } = req.params;
    await userServiceManager.verifyUser(id,otp,res);
})

userLinkConnection.post('/login',async (req,res)=>{
    await userServiceManager.logInUser(req,res);
})

userLinkConnection.get('/',async (req,res)=>{
    const allUsers = await userServiceManager.getAllUsers(req, res);
    res.send(allUsers);
})

userLinkConnection.post('/search', async (req,res)=>{
    const users = await userServiceManager.searchForUser(req,res);
})

userLinkConnection.post('/search/seller', async (req,res)=>{
    const users = await userServiceManager.searchForSeller(req,res);
})

userLinkConnection.get('/:id',async (req,res)=>{
    const { id } = req.params;
    const user = await userServiceManager.getUserById(id,req,res)
    res.send(user);
})

userLinkConnection.get('/seller/:id',async (req,res)=>{
    const { id } = req.params;
    await userServiceManager.getUserBySellerId(id,req,res)
})

userLinkConnection.put('/:id',async(req,res)=>{
    const { id } = req.params;
    const updatedUser = await userServiceManager.editUserInformation(id,req);
    res.send(updatedUser);
})