import Express from "express";
import { productModel } from '../models/product.model.js';
import { Auth } from '../middleware/auth.js';
import { businessLogModel } from '../models/businessLog.model.js'

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
        let filterListBuyers=[]
        const product = await productModel.findById(id).populate([
            {
                path:"seller",
                select:"name"
            },
            "categories"
        ]);
        const productUnderOrg = await businessLogModel.find({memberId: product.seller},'business memberId').populate({
            path: "business",
            select: "businessName _id"
        });
        if (productUnderOrg) productUnderOrg.forEach(log=>filterListBuyers.unshift(log.business))
        if (!product) return res.status(404).json(`product with id(${id}) not found`)
        return res.status(200).json({
            status:"success",
            productInfo: product,
            businessInfo: filterListBuyers
        });
    } catch (error) {
        console.error(error);
        const { id } = req.params;
        return res.status(500).json(`failed to get product with id(${id})`)        
    }
})

productinkConnect.post('/items/search',async (req,res)=>{
    try {
        const page = req.body.page || 0;
        const amountToSend = 10;
        const { search } = req.body;
        const listOfSearchedProduct = await productModel.find({
            'name': {
                $regex: search, 
                $options: 'i' 
            }
        }).skip(page * amountToSend).limit(amountToSend);
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