import Express from "express";
import { productModel } from '../models/product.model.js';
import { homeManagementService } from '../services/home-management.service.js'
import { Auth } from '../middleware/auth.js';

export const productinkConnect = Express.Router();

// ###############################################
// ############## POST PRODUCT ###################
// ###############################################
productinkConnect.post('/add', async (req,res)=>{
    try {
        const product = await productModel.create(req.body);
        return res.status(200).json({
            message: 'product(s) added to database',
            productId: product._id
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json(`failed to add product`)
    }
}) 

// ##############################################
// ############## GET PRODUCT ###################
// ##############################################
productinkConnect.get('/:id',async (req,res)=>{
    try {
        const { id } = req.params;
        const product = await productModel.findById(id).populate([
            {
                path:"seller",
                select:"name"
            },
            "categories"
        ]);
        if (!product) return res.status(404).json(`product with id(${id}) not found`)
        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        const { id } = req.params;
        return res.status(500).json(`failed to get product with id(${id})`)        
    }
})

productinkConnect.get('/recommendations/:id/:userId/:page',async (req,res)=>{
    try {
        const { id, userId, page } = req.params;
        let recommendationBasedOnCategory = [];
        const product = await productModel.findById(id).populate([
            {
                path:"seller",
                select:"name"
            },
            "categories"
        ]);
        
        if (!product) return res.status(404).json(`product with id(${id}) not found`)

        //get recommendation based on category
        /*product.categories.forEach(async (c)=>{
            const arrayOfProducts = await getProductRecommendations(c._id.toString(), userId, page);
            arrayOfProducts.forEach((item)=>{
               recommendationBasedOnCategory.push(item);
               console.log("length: " + recommendationBasedOnCategory.length);
            });
        });*/
        for(let i = 0; i<product.categories.length;i++){
            const arrayOfProducts = await getProductRecommendations(product.categories[i]._id.toString(), userId, page);
            arrayOfProducts.forEach((item)=>{
               recommendationBasedOnCategory.push(item);
            });
        }
        //removing of dulplicate enetities
        let uniqueArray = recommendationBasedOnCategory.filter((item, index, self) =>
                self.findIndex(obj => obj.id === item.id) === index
        );
        uniqueArray = uniqueArray.filter((p)=> p._id != id);
        //send recommendation if we know the user else default recommendation
        if (userId != 'undefined'){
            return res.status(200).json({
                "productDetails": product,
                "recommendations": uniqueArray
            });
        }else{
            return res.status(200).json({
                "productDetails": product,
                "recommendations": uniqueArray
            });
        }

    } catch (error) {
        console.error(error);
        const { id } = req.params;
        return res.status(500).json(`failed to get category with id(${id})`)        
    }
})

productinkConnect.post('/items/search',async (req,res)=>{
    try {
        const page = req.body.page || 0;
        const amountToSend = 10;
        const { search } = req.body;
        let listOfSearchedProduct = await productModel.find({
            'name': {
                $regex: search, 
                $options: 'i' 
            }
        }).skip(page * amountToSend).limit(amountToSend);
        //console.log("search###############################: \n\n", listOfSearchedProduct);
        listOfSearchedProduct = listOfSearchedProduct.filter(n => n.status == true);
        return res.send(listOfSearchedProduct);
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
})

productinkConnect.get('/',async (req,res)=>{
    try {
        const page = req.body.page || 0;
        const amountToSend = 10;
        const product = await productModel.find().skip(page * amountToSend).limit(amountToSend).populate([
            {
                path:"seller",
                select:"name"
            },
            "categories"
        ]);
        if (!product) return res.status(404).json(`products not found`)
        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        const { id } = req.params;
        return res.status(500).json(`failed to get product with id(${id})`)        
    }
})

productinkConnect.get('/seller/:id',async (req,res)=>{
    try {
        const { id } = req.params;
        const products = await productModel.find({
            'seller':{
                $in:id
            }
        }).populate(
            {
                path:"seller",
                select:"name"
            },
        );
        if (!products) return res.status(404).json(`products by user(${id}) not found`)
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        const { id } = req.params;
        return res.status(500).json(`failed to get user products with id(${id})`)        
    }
})


// #################################################
// ############## UPDATE PRODUCT ###################
// #################################################
productinkConnect.put('/:id' ,async (req,res)=>{
    try {
        const { id } = req.params;
        const product = await productModel.findByIdAndUpdate(id,req.body);
        if (!product) return res.status(404).json(`product with id(${id}) not found`);
        const updatedProduct = await productModel.findById(id);
        return res.send({
            status: "SUCCESS",
            object: updatedProduct
        });
    } catch (error) {
        console.error(error);
        const { id } = req.params;
        return res.send({
            status: "ERROR",
            message:`failed to update product with id(${id})`
        });       
    }
})


// #################################################
// ########## FUNCTION FOR RECOMMENDATIONS #########
// #################################################
let getProductRecommendations = async(categoryId, userId='undefinded', page)=> {
    try{
        let req = {
           'body':{
                'page': page
            }
        };
        let homeManagementServiceManager = new homeManagementService();
        return await homeManagementServiceManager.getByCategory(categoryId,req);
    } catch (error){
        console.log(error);
    }
}
