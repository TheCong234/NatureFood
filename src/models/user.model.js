const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

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

const UserSchema = Schema({
    
    email:{
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate:{
            validator: function(v){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address`
        },
        required: true
    },
    phone:{
        type: String,
        trim: true,
        unique: true
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    updateAt:{
        type: Date,
        default: Date.now
    },
    image: ImageSchema,
    favorite: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

UserSchema.pre('save', function(next){
    this.updateAt = new Date();
    next();
});

UserSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        return next(error);
    }
})

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);