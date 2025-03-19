import Express from 'express';
import { reviewModel } from '../models/review.model.js';

export class ReviewService{
    async getReview(id, req,res){
        const page = req.body.page || 0;
        const amountToSend = 10;
        const reviews = await reviewModel.find({ productId: id }).populate(
            {
                path: 'user',
                select: 'name'
            }
        ).skip(page * amountToSend).limit(amountToSend);
        if(reviews.length < 1) return res.status(200).json({
            status: 'fail',
            message: 'no comments on product'
        });
        return res.status(200).json({
            status: 'success',
            reviews: reviews
        })
    }
    async addReview(id, req, res){
        const reviewObject = await reviewModel.create(req.body);
        if(!reviewObject) return res.status(500).json({
            status: 'fail',
            message: 'failed to add your comment'
        });
        if(reviewObject) return res.status(200).json({
            status: 'success',
            message: 'review successfully added'
        });
    }
};
