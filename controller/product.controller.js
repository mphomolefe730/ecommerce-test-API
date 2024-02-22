import Express from "express";
import { productModel } from '../models/product.model.js'

export const productinkConnect = Express.Router();

// ###############################################
// ############## POST PRODUCT ###################
// ###############################################
productinkConnect.post('/add', async (req,res)=>{
    try {
        const product = await productModel.create(req.body);
        res.status(200).json(`product(s) added to database`)
    } catch (error) {
        console.error(error);
        res.status(500).json(`failed to add product`)
    }
}) 


// ##############################################
// ############## GET PRODUCT ###################
// ##############################################
productinkConnect.get('/:id',async (req,res)=>{
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        if (!product) return res.status(404).json(`product with id(${id}) not found`)
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        const { id } = req.params;
        res.status(500).json(`failed to get product with id(${id})`)        
    }
})


// #################################################
// ############## UPDATE PRODUCT ###################
// #################################################
productinkConnect.put('/:id',async (req,res)=>{
    try {
        const { id } = req.params;
        const product = await productModel.findByIdAndUpdate(id,req.body);
        if (!product) return res.status(404).json(`product with id(${id}) not found`);
        const updtaedProduct = await productModel.findById(id);
        res.status(200).json(updtaedProduct);
    } catch (error) {
        console.error(error);
        const { id } = req.params;
        res.status(500).json(`failed to update product with id(${id})`)       
    }
})