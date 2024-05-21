const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }
});

module.exports = mongoose.model('Category', CategorySchema);