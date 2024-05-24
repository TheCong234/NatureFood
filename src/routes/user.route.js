const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const UserSchema = require('../models/user.model');
const passport = require('passport');
const LocalStratege = require('passport-local');
const {storage} = require('../cloudinary/index');
const multer = require('multer');
const upload = multer({storage: storage});

passport.use(new LocalStratege(UserSchema.authenticate()));
passport.serializeUser(UserSchema.serializeUser());
passport.deserializeUser(UserSchema.deserializeUser());


router.get('/login', (req, res)=>{
    res.render('user/user.login.ejs');
})

router.get('/register', (req, res)=>{
    res.render('user/user.register.ejs');
})

router.post('/login', catchAsync(async(req, res, next)=>{
    res.send('post login');
}))

router.post('/register', upload.single('image'), catchAsync(async(req, res, next)=>{
    const newUser = new UserSchema(req.body.register);
    const img = req.file;
    newUser.image = {url: img.path, filename: img.filename};
    await newUser.save();
    res.render('user/user.login.ejs');
}))

module.exports = router;