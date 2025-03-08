import { homeManagementModel } from '../models/homeManagement.model.js'
import { productModel } from '../models/product.model.js';

export class homeManagementService{
    async getAllCategories(){
        try {
            const categories = await homeManagementModel.find();
            return categories;
        } catch (error) {
            console.error(error);
            res.status(500).json(`failed to categories`);
        }
    }
    async addNewCategory(req,res){
        try {
            const newCategory = await homeManagementModel.create(req.body);
            return newCategory;
        } catch (error) {
            console.error(error);
            res.status(500).json(`failed add categories`);            
        }
    }
    async getByCategory(id,req,res){
        try {
            const page = req.body.page || 0;
            const amountToSend = 10;
            let products = await productModel.find({ 
                'categories': { 
                    $in: id 
                }
            }).skip(page * amountToSend).limit(amountToSend);
            products = products.filter(n => n.status == true);
            if (!products) return res.status(404).send("category not found");
            return products;
        } catch (error) {
            console.error(error);
            res.status(500).json(`failed find categories`);    
        }
    }
}
