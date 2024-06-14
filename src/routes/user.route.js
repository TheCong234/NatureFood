const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const UserSchema = require('../models/user.model');
const passport = require('passport');
const LocalStratege = require('passport-local');
const {storage, cloudinary} = require('../cloudinary/index');
const multer = require('multer');
const upload = multer({storage: storage});
const {isLoggedIn, storeReturnTo} = require('../middleware');

passport.use(new LocalStratege(UserSchema.authenticate()));
passport.serializeUser(UserSchema.serializeUser());
passport.deserializeUser(UserSchema.deserializeUser());

//form đăng nhập
router.get('/login', (req, res)=>{
    res.render('user/user.login.ejs');
})

//form đăng ký
router.get('/register', (req, res)=>{
    res.render('user/user.register.ejs');
}) 

//form quên mật khẩu
router.get('/forgot', catchAsync((req, res, next)=>{
    res.render('user/user.forgot.ejs');
}))

//Thông tin người dùng
router.get('/info', isLoggedIn, catchAsync((req, res, next)=>{
    res.send(req.user);
}))

router.get('/logout', (req, res, next)=>{
    req.logout(function(err){
        if(err){
            return next(err);
        }
        req.flash('success', 'Goodbye');
        return res.redirect('/home');
    })
})

//đăng nhập
router.post('/login',storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect:'/user/login'}), catchAsync(async(req, res, next)=>{
    const to = res.locals.returnTo || '/home';
    req.flash('success', `Chào mừng ${req.body.username} quay trở lại`);
    res.redirect(to);
}))

//đăng ký
router.post('/register', catchAsync(async(req, res, next)=>{
    const{username, email, phone, password} = req.body.register;
    const user = new UserSchema({username, email, phone});
    const newUser = await UserSchema.register(user, password);

    req.login(newUser, err =>{
        if(err) return next();
        res.redirect('/product');
    })
    res.render('user/user.login.ejs');
}))

module.exports = router;