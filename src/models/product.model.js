const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    review:[
        {
            type:Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    image:[
        {
            type: Schema.Types.ObjectId,
            ref: "Image"
        }
    ]
})