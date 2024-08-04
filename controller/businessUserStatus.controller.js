import Express from 'express';
import { businessUserStatusModel } from '../models/businessUserStatus.model.js';

export const businessRoleLinkConnection = Express.Router();

businessRoleLinkConnection.post("/add",async (req,res)=>{
    const role = await businessUserStatusModel.create(req.body);
    res.status(200).json({
        message: "success",
        roleObject: role
    })
})

businessRoleLinkConnection.get("/", async (req,res)=>{
    const allRoles = await businessUserStatusModel.find();
    res.status(200).json({
        message: "success",
        roleObject: allRoles
    })
})