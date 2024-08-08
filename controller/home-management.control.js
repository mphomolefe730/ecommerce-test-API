import Express from 'express';
import { homeManagementService } from '../services/home-management.service.js'

export const homeManagementLinkConnection = Express.Router();
let homeManagementServiceManager = new homeManagementService();

homeManagementLinkConnection.post('/add',async (req,res)=>{
    const newCategory = await homeManagementServiceManager.addNewCategory(req,res);
    res.send(newCategory);
})

homeManagementLinkConnection.get('/',async (req,res)=>{
    const categories = await homeManagementServiceManager.getAllCategories();
    res.send(categories);
})

homeManagementLinkConnection.get('/active',async (req,res)=>{
    let activeCategory=[];
    const categories = await homeManagementServiceManager.getAllCategories();
    categories.forEach((category)=>{
        if (category.status == true){
            activeCategory.unshift(category);
        }
    });
    res.send(activeCategory);
})

homeManagementLinkConnection.put('/category/:id',async (req,res)=>{
    const {id} = req.params;
    const productsOfcategory = await homeManagementServiceManager.getByCategory(id,req,res);
    res.send(productsOfcategory);
})