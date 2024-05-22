const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReviewSchema = require('./review.model');

const ImageSchema = new Schema({
    url:{
        type: String,
        required: true
    },
    filename:{
        type: String,
        required: true
    }
});

const ProductSchema = mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    weight: Number,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    inventory: Number,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    images:[ImageSchema]
})

//xóa liên quan đến sản phẩm (reviews)
ProductSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await ReviewSchema.deleteMany({ _id: {$in: doc.reviews}});
    }
})

module.exports = mongoose.model('Product', ProductSchema);