import Express from "express";
import { userModel } from '../models/user.model.js';

export const userLinkConnection = Express.Router();

// ###############################################
// ############## POST PRODUCT ###################
// ###############################################
userLinkConnection.post('/add', async (req,res)=>{
    try {
        const user = await userModel.create(req.body);
        res.status(200).json(`user(s) added to database`)
    } catch (error) {
        console.error(error);
        res.status(500).json(`failed to add user`)
    }
}) 