const express = require('express');
const router = express.Router({mergeParams: true});
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
const UserController = require('../controller/user.controller');

//form đăng nhập
router.get('/login', UserController.renderLogin);

//form đăng ký
router.get('/register', UserController.renderRegister); 

//form quên mật khẩu
router.get('/forgot', UserController.renderForgot);

//Thông tin người dùng
router.get('/info/:id', UserController.getUserById);
router.get('/info', isLoggedIn, UserController.getCurrentUser);

router.get('/logout', storeReturnTo, UserController.logout)

//đăng nhập
router.post('/login',
    storeReturnTo, 
    passport.authenticate('local', {failureFlash: true, failureRedirect:'/user/login'}), 
    UserController.login);

//cập nhật thông tin người dùng
router.put('/info/:id', UserController.update);
router.put('/info/:id/avatar', upload.single('image'), UserController.updateAvatar);

//cập nhật danh sách yêu thích
router.put('/favorite/:productId', UserController.updateFavorite);


//đăng ký
router.post('/register', UserController.register);

module.exports = router;