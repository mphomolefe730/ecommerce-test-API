import { inventoryModel } from "../models/inventory.model.js";
import { chatModel } from '../models/chat.model.js';

export class inventoryService{
    async addNewItem(req,res){
        try {
            let chat = await chatModel.create(
                {
                    chat: req.body.chat[0].chat, 
                    send: req.body.user
                }
            );
            const newLog = new inventoryModel({
                user: req.body.user,
                seller: req.body.seller,
                items: req.body.items,
                status: req.body.status,
                total: req.body.total,
                chat:{
                    chatId: chat._id
                }               
            });
            newLog.save().then(()=>{
                res.status(200).json({
                    status: "SUCCESS",
                    message: newLog
                });
            })
        } catch (error) {
            res.status(500).json({
                status: "ERROR",
                message: "Unable to furfil your request"
            })
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
                'seller': {
                    $in: id
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
            return res.status(200).json({
                order: sellerOrder
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getInventoryBySellerAndCatergory(id,catergory,req,res){
        const page = req.body.page || 0;
        const amountToSend = 10;
        const sellerInventory = await inventoryModel.find({
            'seller': {
                $in: id
            }
        }).populate([
            {
                path:'user',
                select: 'name'
            },{
                path:'items.productId',
                select: 'name'
            }
        ]).skip(page * amountToSend).limit(amountToSend);
        let filteredList;
        if(sellerInventory) filteredList = await sellerInventory.filter((a)=>a.status == catergory);
        if(filteredList) return res.status(200).json({message:"success",order:filteredList})
    }
    
    async getInventoryById(id,res){
        try {
            const item = await inventoryModel.findById(id).populate([
                {
                    path: 'items.productId',
                    select: 'name image'
                },{
                    path: 'chat.chatId'
                }
            ])
            if(!item) return res.status(404).json({
                message:'No Item found'
            });
            return res.status(200).json({
                message: "Success",
                item: item
            })
        } catch (error) {
            console.log(error);
        }
    }
    async updateInventoryItem(id,req,res){
        try {
            const product = await inventoryModel.findByIdAndUpdate(id,req.body);
            if (!product) return res.status(404).json({message:"error",error: `enquiry with id(${id}) not found`});
            const updatedProduct = await inventoryModel.findById(id);
            return res.status(200).json({message:"success",order:updatedProduct});
        } catch (error) {
            console.error(error);
            res.status(500).json({message:"error",error:`failed to update enquiry with id(${id})`});             
        }
    }
}