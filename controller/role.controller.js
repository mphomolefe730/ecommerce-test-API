import Express from 'express';
import { roleModel } from '../models/role.model.js';

export const roleLinkConnection = Express.Router();

roleLinkConnection.post('/add', async (req,res)=>{
    const role = await roleModel.create(req.body);
    res.send(role);
})
roleLinkConnection.get('/',async (req,res)=>{
    const allRoles = await roleModel.find();
    res.send(allRoles);
})
roleLinkConnection.delete(':id',async (req,res)=>{
    try {
        const { id } = req.params;
        const response = await roleModel.findByIdAndDelete(id);
        res.send(`role with details ${response} has been deleted`);
    } catch (error) {
        res.send(error);
    }
})