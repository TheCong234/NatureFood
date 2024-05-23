const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = Schema({
    body: String,
    rating: {
        type: Number,
        require: true,
        min: 1,
        max: 5
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    updateAt:{
        type: Date,
        default: Date.now
    },
    feedback: String
})

module.exports = mongoose.model('Review', ReviewSchema);