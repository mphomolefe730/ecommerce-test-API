import Express from 'express';
import { inventoryService } from '../services/inventory.service.js';

export const inventoryLinkConnection = Express.Router();
const inventoryServiceManager = new inventoryService();

inventoryLinkConnection.post('/add',async(req,res)=>{
    const log = await inventoryServiceManager.addNewItem(req,res);
    res.send(log);
});
inventoryLinkConnection.get('/', async (req,res)=>{
    const totalInventoryLog = await inventoryServiceManager.getAllInventoryLog(res);
    res.send(totalInventoryLog);
});
inventoryLinkConnection.get('/:id',async (req,res)=>{
    const { id } = req.params;
    const sellersOrders = await inventoryServiceManager.getInventoryBySeller(id,res);
    res.send(sellersOrders);
});

inventoryLinkConnection.put('/:id',async (req,res)=>{
    const { id } = req.params;
    const updatedProduct = await inventoryServiceManager.updateInventoryItem(id,req,res);
    res.send(updatedProduct);
})