const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url:{
        type: String,
        required: true
    },
    filename:{
        type: String,
        required: true
    }
})

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    image: ImageSchema
});

module.exports = mongoose.model('Category', CategorySchema);