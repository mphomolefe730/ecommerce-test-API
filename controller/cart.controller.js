import Express from 'express';
import { CartService } from '../services/cart.service.js';

export const cartLinkConnection = Express.Router();
let cartServiceManager = new CartService();

cartLinkConnection.post('/add', async (req,res)=>{
    await cartServiceManager.createNewCart(req,res);
    res.status(200).json(`product(s) added to cart`)
}) 

cartLinkConnection.get('/:id',async(req,res)=>{
    const { id } = req.params;
    await cartServiceManager.getCartByUserId(id,res);
    res.status(200).json(userCart);
})

cartLinkConnection.put('/:id',async (req,res)=>{
    const { id } = req.params;
    let userCart = await cartServiceManager.getCartByUserId(id,res);
    const updatedCart = await updateUserCartId(id,req,res);
    res.status(200).json(updatedCart);
})