import Express from "express";
import { productModel } from '../models/product.model.js';
import { Auth } from '../middleware/auth.js';

export const productinkConnect = Express.Router();

// ###############################################
// ############## POST PRODUCT ###################
// ###############################################
productinkConnect.post('/add', async (req,res)=>{
    try {
        const product = await productModel.create(req.body);
        return res.status(200).json(`product(s) added to database`)
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

productinkConnect.get('/',async (req,res)=>{
    try {
        const product = await productModel.find().populate([
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
productinkConnect.put('/:id',Auth ,async (req,res)=>{
    try {
        const { id } = req.params;
        const product = await productModel.findByIdAndUpdate(id,req.body);
        if (!product) return res.status(404).json(`product with id(${id}) not found`);
        const updatedProduct = await productModel.findById(id);
        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        const { id } = req.params;
        return res.status(500).json(`failed to update product with id(${id})`);       
    }
})