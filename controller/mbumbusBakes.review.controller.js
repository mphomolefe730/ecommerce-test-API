import Express from 'express';
import { mbumbusBakesReviewModel } from '../models/mbumbusBakes.review.model.js';

export const mbumbusBakesreviewLinkConnection = Express.Router();

mbumbusBakesreviewLinkConnection.post('/add', async (req,res)=>{
    try {
        const review = await mbumbusBakesReviewModel.create(req.body);
        return res.status(200).json({
            message: 'review added to database',
            reviewId: review._id
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json(`failed to add review`)
    }
});

mbumbusBakesreviewLinkConnection.get('/', async(req,res)=>{
    try{
        const reviews = await mbumbusBakesReviewModel.find();
        if (!reviews) return res.status(404).json(`no reviews found`)
        return res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        const { id } = req.params;
        return res.status(500).json(`failed to get reviews`)        
    }
})