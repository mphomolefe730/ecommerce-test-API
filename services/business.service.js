import Express from "express";
import { businessModel } from '../models/business.model.js'
import { businessLogModel } from "../models/businessLog.model.js";
import { businessUserStatusModel } from "../models/businessUserStatus.model.js";
import { businessTipsSummaryModel } from '../models/businessTipSummary.model.js';
import { businessTipsModel } from '../models/businessTip.model.js'

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
        else return res.status(404).json({message:"business not found"})
    } 

    async getBusinessBySellerId(sellerId,res){
        try {
            let businessObject = await businessLogModel.findOne({ memberId: sellerId }).populate({
                path:"business"
            });
            if (businessObject) return res.status(200).json({message:"success",object:businessObject});
            res.status(404).json({message:"business not found"})
        } catch (error) {
            res.status(500).json({
                message: "Error",
                body: error
            })            
        }
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
    async getAllBusinessSummaryTips(req,res){
        try {            
            const page = req.body.page || 0;
            const amountToSend = 10;
            const listOfTips = await businessTipsSummaryModel.find({},"tipTitle tipDescription tipThumbnail businessTipId").skip(page * amountToSend).limit(amountToSend);
            return res.status(200).json({status: 'success',object:listOfTips});
        } catch (error) {
            console.log(error);
            res.status(500).json({status: 'error',message:"service currently unavailable"})
        }
    }
    async addBusinessTipSummary(req,res){
        try {
            const summaryLog = await businessTipsSummaryModel.create(req.body);
            res.status(201).json({status:"success",object:summaryLog});
        } catch (error) {
            console.log(error);
            res.status(500).json({status:"error",object:error});
        }
    }
    async addBusinessTip(req,res){
        try {            
            const tip = await businessTipsModel.create(req.body.tipBody);
            if (!tip) return res.status(500).json({status:"error",object:"failed to create tip"});  
            if (tip){
                await businessTipsSummaryModel.create({
                    tipTitle: tip.title,
                    tipDescription: `${tip.description.substring(0,35)}...`,
                    tipThumbnail: req.body.thumbnail,
                    businessTipId: tip._id
                });
                return res.status(201).json({status:"success",object:tip});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({status:"error",object:error});            
        }
    }
    async getBusinessTipById(id,req,res){
        try {
            const tip = await businessTipsModel.find({_id:id});
            if (!tip) return res.status(404).json({status:"error",message:"Business tip remove or doesnt exist anymore"});
            return res.status(200).json({status:"success",object:tip});
        } catch (error) {
            console.log(error);
            return res.status(404).json({status:"error",message:"opps something went wrong"});
        }
    }
}