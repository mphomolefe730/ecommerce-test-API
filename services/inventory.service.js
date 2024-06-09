import { inventoryModel } from "../models/inventory.model.js";
import { chatModel } from '../models/chat.model.js';

export class inventoryService{
    async addNewItem(req,res){
        try {
            let chat ='';
            if (req.body.chat[0].chat != null) {
                chat  = await chatModel.create(
                    {
                        chat: req.body.chat[0].chat,
                        send: req.body.user
                    }
                );
            }
            const newLog = new inventoryModel({
                user: req.body.user,
                seller: req.body.seller,
                items: req.body.items,
                status: req.body.status,
                chat:{
                    chatId: (req.body.chat[0].chat != null) ? chat._Id : NULL
                }
               
            });
            return newLog;
        } catch (error) {
            res.send(error);
        }
    }
    async getAllInventoryLog(res){
        try {
            const allInventory = await inventoryModel.find().populate([
                {
                    path: "user",
                    select: "_id name surname"
                },
            ]);
            return allInventory
        } catch (error) {
            res.send(error);
        }
    }
    async getInventoryBySeller(id,res){
        try {
            const sellerOrder = await inventoryModel.find({
                'seller':{
                    $in:id
                }
            }).populate([
                {
                    path:'user',
                    select: 'name'
                },{
                    path:'items.productId',
                    select: 'name'
                }
            ]);
            if(!sellerOrder) return res.send("No inventory found");
            return sellerOrder;
        } catch (error) {
            res.send(error);
        }
    }
    async updateInventoryItem(id,req,res){
        try {
            const product = await inventoryModel.findByIdAndUpdate(id,req.body);
            if (!product) return res.status(404).json(`enquiry with id(${id}) not found`);
            const updatedProduct = await inventoryModel.findById(id);
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json(`failed to update enquiry with id(${id})`);             
        }
    }
}