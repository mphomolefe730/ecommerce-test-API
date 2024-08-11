import Express from 'express';
import { businessUserStatusModel } from '../models/businessUserStatus.model.js'
import { BusinessService } from '../services/business.service.js';

export const businessLinkConnection = Express.Router();
const businessServiceManager = new BusinessService();

businessLinkConnection.post('/add', async (req,res)=>{
    await businessServiceManager.createNewBusiness(req,res);
});

businessLinkConnection.post('/add/log', async (req,res)=>{
    const { businessId, userId, status, adminRole } = req.body;    
    const ownerRole = await businessUserStatusModel.find({
        "role":{
            $in: status
        }
    })
    const businessLog = {
        business: businessId,
        memberId: userId,
        status: ownerRole[0]._id,
        adminRoles: adminRole
    };
    await businessServiceManager.createBusinessLog(businessLog,res);
});

businessLinkConnection.get("/",async (req,res)=>{    
    await businessServiceManager.getAllBusiness(res);
});

businessLinkConnection.get("/:name",async (req,res)=>{   
    const { name } = req.params;
    await businessServiceManager.getBusinessByName(name,res);
});

businessLinkConnection.get("/seller/:id",async (req,res)=>{
    const { id } = req.params;
    await businessServiceManager.getBusinessBySellerId(id,res)
});