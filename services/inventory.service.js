import { inventoryModel } from "../models/inventory.model.js";

export class inventoryService{
    async addNewItem(req,res){
        try {
            const newLog = await inventoryModel.create(req.body);
            return newLog;
        } catch (error) {
            res.send(error);
        }
    }
    async getAllInventoryLog(res){
        try {
            const allInventory = await inventoryModel.find();
            return allInventory
        } catch (error) {
            res.send(error);
        }
    }
}