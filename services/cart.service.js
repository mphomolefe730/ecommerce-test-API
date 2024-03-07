import { cartModel } from '../models/cart.model.js';

export class CartService{
    async createNewCart(req,res){
        try {
            const product = await cartModel.create(req.body);
            return product;
        } catch (error) {
            console.error(error);
            res.status(500).json(`failed to add product to cart`);
        }
    }
    async getCartByUserId(id,res){
        try {
            //get user id
            const userCart = await cartModel.findOne({ userId: id });
            if (!userCart) return res.status(404).json(`oops. Seems like we cant find your cart`);
            return userCart;
        } catch (error) {
            console.error(error);
            res.status(500).json(`failed to get cart`)
        }
    }
    async updateUserCartId(id,req,res){
        try{
            const userCart = await cartModel.findOneAndUpdate({ userId: id },req.body);
            if (!userCart) return res.status(404).json(`oops. Seems like we cant find your cart`);
            return userCart;
        } catch (error) {
            console.error(error);
            res.status(500).json(`failed to update cart`)       
        }
    }
}