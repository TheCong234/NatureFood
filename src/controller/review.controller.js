const ReviewModel = require('../models/review.model');
const ProductModel = require('../models/product.model');

const ReviewController = {
    async createReview(req, res, next){
        try {
            const {id} = req.params;
            const product = await ProductModel.findById(id);
            const newReview = new ReviewModel(req.body.review);
            newReview.author = req.user.id;
            product.reviews.push(newReview);
            await newReview.save();
            await product.save();
            req.flash('success', 'Thêm đánh giá thành công');
            res.redirect(`/product/${id}`);
        } catch (error) {
            req.flash('success', 'Thêm đánh giá thất bại');
            res.redirect(`/product/${req.params.id}`);
        }
    }, 

    async updateReview(req, res, next){
        try {
            const {id, reviewId} = req.params;
            await ReviewModel.findByIdAndUpdate(reviewId, req.body.review);
            req.flash('success', 'Cập nhật bình luận thành công');
            res.redirect(`/product/${id}`);
        } catch (error) {
            req.flash('error', `Cập nhật bình luận thất bại: ${error}`);
            res.redirect(`/product/${req.params.id}`);
        }
    },

    async deleteReview(req, res, next){
        try {
            const {id, reviewId} = req.params;
            await ReviewModel.findByIdAndDelete(reviewId);
            await ProductModel.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
            req.flash('success', 'Xóa đánh giá thành công');
            res.redirect(`/product/${id}`);
        } catch (error) {
            req.flash('error', `Xóa đánh giá thất bại: ${error}`);
            res.redirect(`/product/${req.params.id}`);
        }
    }
}

module.exports = ReviewController;