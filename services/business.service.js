import Express from "express";
import { businessModel } from '../models/business.model.js'
import { businessLogModel } from "../models/businessLog.model.js";
import { businessUserStatusModel } from "../models/businessUserStatus.model.js";

export class BusinessService{
    async createNewBusiness(req,res){
        const { businessName,businessDescription,userId } = req.body;
        const businessExist = await this.getBusinessByName(businessName);
        if (!businessExist){
            let businessObject = new businessModel({
                businessName: businessName,
                businessDescription: businessDescription
            })
            const ownerRole = await businessUserStatusModel.find({
                "role":{
                    $in: "Owner"
                }
            })
            businessObject.save().then(async ()=>{
                const businessLog = await this.createBusinessLog({
                    business: businessObject._id,
                    memberId: userId,
                    status: ownerRole[0]._id,
                    adminRoles: true
                })
                res.status(200).json({
                    message:"success",
                    businessObject: businessObject,
                    businessLog: businessLog,
                })
            })
        }
        if (businessExist) res.status(200).json({message: `Business/Organisation already exist`});
    }

    async getBusinessByName(businessName,res){
        let businessObject = await businessModel.find({
            'businessName':{
                $regex: businessName,
                $options: "i" 
            }
        })
        if (res) res.send(businessObject);
        if (businessObject.length != 0) return businessObject;
    } 

    async getAllBusiness(res){
        const businesses = await businessModel.find();
        if (res) res.status(200).json({object:businesses});
    }

    async createBusinessLog(modelObject,res){
        try{
            const createdLog = await businessLogModel.create(modelObject);
            if (res) res.status(200).json({object:createdLog});

        }catch(err){
            res.status(500).json({
                message: "Error",
                body: err
            })
        }
    }
}