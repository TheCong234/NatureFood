const express = require('express');
const catchAsync = require('../utils/catchAsync');
const router = express.Router({mergeParams: true});
const ReviewSchema = require('../models/review.model');
const ProductSchema = require('../models/product.model');
const { default: mongoose } = require('mongoose');

router.post('/', catchAsync(async(req, res, next)=>{
    const {id} = req.params;
    const product = await ProductSchema.findById(id);
    const newReview = new ReviewSchema(req.body.review);
    product.reviews.push(newReview);
    await newReview.save();
    await product.save();
    res.redirect(`/product/${id}`);
}))

router.put('/:reviewId', catchAsync(async(req, res, next)=>{
    const {id, reviewId} = req.params;
    await ReviewSchema.findByIdAndUpdate(reviewId, req.body.review);
    res.redirect(`/product/${id}`);
}))

router.delete('/:reviewId', catchAsync(async(req, res, next)=>{
    const {id, reviewId} = req.params;
    await ReviewSchema.findByIdAndDelete(reviewId);
    await ProductSchema.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    res.redirect(`/product/${id}/review/${reviewId}`);
}))

module.exports = router;