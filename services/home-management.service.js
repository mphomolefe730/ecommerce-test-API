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
    async getByCategory(id,res){
        try {
            const products = await productModel.find({ 
                'categories': { 
                    $in: id 
                }
            })
            if (!products) return res.send("category not found");
            return products;
        } catch (error) {
            console.error(error);
            res.status(500).json(`failed find categories`);    
        }
    }
}