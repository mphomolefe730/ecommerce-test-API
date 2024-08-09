import Express from 'express';
import { inventoryService } from '../services/inventory.service.js';

export const inventoryLinkConnection = Express.Router();
const inventoryServiceManager = new inventoryService();

inventoryLinkConnection.post('/add',async(req,res)=>{
    await inventoryServiceManager.addNewItem(req,res);
});
inventoryLinkConnection.get('/', async (req,res)=>{
    const totalInventoryLog = await inventoryServiceManager.getAllInventoryLog(res);
    res.status(202).json({
        message: "success",
        products: totalInventoryLog
    });
});

inventoryLinkConnection.get('/seller/:id',async (req,res)=>{
    const { id } = req.params;
    await inventoryServiceManager.getInventoryBySeller(id,res);
});

inventoryLinkConnection.post('/seller/:id/:catergory',async (req,res)=>{
    const { id, catergory } = req.params;
    await inventoryServiceManager.getInventoryBySellerAndCatergory(id,catergory,req,res);
})

inventoryLinkConnection.get('/:id',async (req,res)=>{
    const { id } = req.params
    await inventoryServiceManager.getInventoryById(id,res)
})

inventoryLinkConnection.put('/:id',async (req,res)=>{
    const { id } = req.params;
    const updatedProduct = await inventoryServiceManager.updateInventoryItem(id,req,res);
    // res.send(updatedProduct);
})