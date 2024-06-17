const express = require('express');
const catchAsync = require('../utils/catchAsync');
const router = express.Router({mergeParams: true});
const ReviewSchema = require('../models/review.model');
const ProductSchema = require('../models/product.model');
const {isLoggedIn} = require('../middleware');
const ReviewController = require('../controller/review.controller');

router.post('/', isLoggedIn, ReviewController.createReview);

router.put('/:reviewId', ReviewController.updateReview);

router.delete('/:reviewId', ReviewController.deleteReview);

module.exports = router;