import { cartModel } from '../models/cart.model.js';

export class CartService{
    async createNewCart(req,res){
        try {
            const product = await cartModel.create(req);
            return product;
        } catch (error) {
            console.error(error);
            return res.status(500).json({message:`failed to add product to cart`});
        }
    }
    async getCartByUserId(id,res){
        try {
            const userCart = await cartModel.findOne({ userId: id }).populate(
                {
                    path:'items.productId'
                }
            );
            if (!userCart) return res.status(404).json({message:`oops. Seems like we cant find your cart`});
            return userCart;
        } catch (error) {
            console.error(error);
            return res.status(500).json({message:`failed to get cart`});
        }
    }
    async updateUserCartId(id,req,res){
        try{
            let sellersInCart=[];
            await req.body.items.forEach((item)=>{
                sellersInCart.push(item.productId.seller)
            });
            const cartStatus = await this.allEqual(sellersInCart);
            if (cartStatus == false){
                res.send({
                    message:'can only buy from one seller at a time',
                    status: 'ERROR'
                })
                return ;
            } 
            const userCart = await cartModel.findOneAndUpdate({ userId: id },req.body);
            if (!userCart) return res.status(404).json({message:`oops. Seems like we cant find your cart`});
            res.send({
                message: 'cart successfully updated',
                status: 'SUCCESS',
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({message:`failed to update cart`});       
        }
    }

    async allEqual(arr) {
        if (!arr.length) return true;
        return arr.reduce(function (a, b) { 
               return (a === b) ? a : (!b); 
               }) === arr[0];
    }
}