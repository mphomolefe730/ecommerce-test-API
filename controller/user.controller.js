import Express from "express";
import { userModel } from '../models/user.model.js';

export const userLinkConnection = Express.Router();

// ###############################################
// ############## POST USER ###################
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
userLinkConnection.get('/:id',async (req,res)=>{
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (!user) return res.status(404).json(`user with id(${id}) not found`)
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        const { id } = req.params;
        res.status(500).json(`failed to get user with id(${id})`)        
    }
})