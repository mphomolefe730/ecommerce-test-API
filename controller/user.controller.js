import Express from "express";
import { Auth } from '../middleware/auth.js';
import { UserService } from "../services/user.service.js";

export const userLinkConnection = Express.Router();
let userServiceManager = new UserService();

userLinkConnection.post('/add', async (req,res)=>{
    const user = await userServiceManager.createNewUser(req,res);
    if (user){
        res.send(
            {
                message: `user(s) added to database`,
                user: user
            }
        );
    }
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

userLinkConnection.get('/:id',async (req,res)=>{
    const { id } = req.params;
    const user = await userServiceManager.getUserById(id,res)
    res.send(user);
})

userLinkConnection.put('/:id',async(req,res)=>{
    const { id } = req.params;
    const updatedUser = await userServiceManager.editUserInformation(id,req);
    res.send(updatedUser);
})