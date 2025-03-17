import Express from 'express';
import { reviewModel } from '../models/review.model.js';
import { ReviewService } from '../services/review.service.js';

export const reviewLinkConnection = Express.Router();
let reviewServiceManager = new ReviewService();

reviewLinkConnection.get('/:id', async(req, res)=>{
    const { id } = req.params;
    await reviewServiceManager.getReview(id, req, res);
})
reviewLinkConnection.put('/:id', async(req,res)=>{
    const { id } = req.params;
    await reviewServiceManager.addReview(id, req,res);
})
