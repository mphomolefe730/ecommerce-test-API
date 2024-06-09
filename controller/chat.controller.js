import Express from 'express';
import { chatModel } from '../models/chat.model.js';

export const chatLinkConnection = Express.Router();
// let cartServiceManager = new CartService();

chatLinkConnection.get('/',async (req,res)=>{
    let chats = await chatModel.find();
    res.send(chats);
})