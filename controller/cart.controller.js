import Express from 'express';
import { cartModel } from '../models/cart.model.js';
import util from 'util';

export const cartLinkConnection = Express.Router();

cartLinkConnection.post('/add', async (req,res)=>{
    try {
        const product = await cartModel.create(req.body);
        res.status(200).json(`product(s) added to cart`)
    } catch (error) {
        console.error(error);
        res.status(500).json(`failed to add product to cart`)
    }
}) 

cartLinkConnection.get('/:id',async(req,res)=>{
    try {
        //get user id
        const { id } = req.params;
        const userCart = await cartModel.findOne({ userId: id });
        res.status(200).json(userCart);
    } catch (error) {
        console.error(error);
        res.status(500).json(`failed to get cart`)
    }
})

cartLinkConnection.put('/:id',async (req,res)=>{
    try {
        const { id } = req.params;
        const userCart = await cartModel.findOneAndUpdate({ userId: id },req.body);
        if (!userCart) return res.status(404).json(`oops. Seems like we cant find your cart`);
        const updatedCart = await cartModel.findById(userCart.id);
        res.status(200).json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json(`failed to update cart`)       
    }
})