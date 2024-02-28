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
    const cart = await cartServiceManager.getCartByUserId(id,res);
    res.send(cart);
})

cartLinkConnection.put('/:id',async (req,res)=>{
    const { id } = req.params;
    const updatedCart = await updateUserCartId(id,req,res);
    // res.status(200).json(updatedCart);
    res.send(updatedCart);
})