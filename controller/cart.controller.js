import Express from 'express';
import { CartService } from '../services/cart.service.js';

export const cartLinkConnection = Express.Router();
let cartServiceManager = new CartService();

cartLinkConnection.post('/add', async (req,res)=>{
    let cart = await cartServiceManager.createNewCart(req,res);
    res.status(200).json(`product(s) added to cart`);
    return cart;
}) 

cartLinkConnection.get('/:id',async(req,res)=>{
    const { id } = req.params;
    const cart = await cartServiceManager.getCartByUserId(id,res);
    res.send(cart);
})

cartLinkConnection.put('/:id',async (req,res)=>{
    const { id } = req.params;
    await cartServiceManager.updateUserCartId(id,req,res);
})

// cartLinkConnection.get('')