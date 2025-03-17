import Express from 'express';
import { reviewModel } from '../models/review.model.js';

export class ReviewService{
    async getReview(id, req,res){
        const page = req.body.page || 0;
        const amountToSend = 10;
        const reviews = reviewModel.findById(id).skip(page * amountToSend).limit(amountToSend);

        if(!reviews) return res.status(200).json({
            status: fail,
            message: "no comments on product"
        });
        console.log(reviews);
        return res.status(200).json({
            status: "success",
        })
    }
    async addReview(id, req, res){
        return res.send("add works");
    }
};
