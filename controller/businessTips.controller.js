import Express from 'express';
import { BusinessService } from '../services/business.service.js';

export const businessTipsLinkConnection = Express.Router();
let businessTipsServiceManager = new BusinessService();
 
businessTipsLinkConnection.post('/summary',async (req,res)=>{
    await businessTipsServiceManager.getAllBusinessSummaryTips(req,res);
});

businessTipsLinkConnection.post('/summary/add',async (req,res)=>{
    await businessTipsServiceManager.addBusinessTipSummary(req,res);
});

businessTipsLinkConnection.post('/add',async (req,res)=>{
    await businessTipsServiceManager.addBusinessTip(req,res);
})

businessTipsLinkConnection.get('/:id',async (req,res)=>{
    const { id } = req.params;
    await businessTipsServiceManager.getBusinessTipById(id,req,res);
})