const { cloudinary } = require('../cloudinary');
const UserSchema = require('../models/user.model');

const UserController = {
    async renderLogin(req, res){
        res.render('user/user.login.ejs')
    },

    async renderRegister(req, res) {
        res.render('user/user.register.ejs');
    },

    async renderForgot(req, res){
        res.render('user/user.forgot.ejs');
    },

    async getCurrentUser(req, res){
        const user = req.user;
        res.render('user/info.user.ejs', {user});
    },

    async getUserById(req, res, next){
        try {
            const {id} = req.params;
            const user = await UserSchema.findById(id);
            res.render('user/info.user.ejs', {user});
        } catch (error) {
            res.render('error/index.ejs', {error});
        }
    },

    async logout(req, res, next){
        req.logout(function(err){
            if(err){
                
                return next(err);
            }
            req.flash('success', 'Cảm ơn bạn đã sử dụng dịch vụ');
            return res.redirect('/home');
        })
    },

    async login(req, res, next){
        const to = res.locals.returnTo || '/home';
        req.flash('success', `Chào mừng ${req.body.username} quay trở lại`);
        res.redirect(to);
        
    },

    async register(req, res, next){
        try {
            const{username, email, phone, password} = req.body.register;
            const user = new UserSchema({username, email, phone});
            const newUser = await UserSchema.register(user, password);

            req.login(newUser, (err)=>{
                if(err) 
                    return next(err);
                res.render('home.view.ejs');
            })
        } catch (error) {
            req.flash('error', `Đăng ký thất bại: ${error}`);
            res.redirect('/user/register');
        }
    },

    async update(req, res, next){
        try {
            const {id} =  req.params;
            const user = await UserSchema.findByIdAndUpdate(id,req.body.user);
            await user.save();
            req.flash('success', 'Cập nhật thông tin thành công');
            res.redirect(`/user/info/${id}`);
        } catch (error) {
            res.render('error/index.ejs', {error});
        }
    }, 

    async updateAvatar(req, res, next){
        try {
            const {id} = req.params;
            const user = await UserSchema.findById(id);
            if(user.image?.filename){
                await cloudinary.uploader.destroy(user.image.filename);
            }
            
            const img = {url: req.file.path, filename: req.file.filename};
            user.image = img;
            await user.save();
            req.flash('success', 'Cập nhật hình đại diện thành công');
            res.redirect('/user/info')
        } catch (error) {
            req.flash('error', `Cập nhật ảnh không thành công: ${error}`);
            res.redirect("/user/info");
        }
    },

    async updateFavorite(req, res, next){
        try {
            const {productId} = req.params;
            const id = req.user._id;
            const user =  await UserSchema.findById(id).populate('favorite');
            const favoriteExist = user.favorite.some(fav => fav._id.toString() === productId) 
            if(favoriteExist){
                await user.updateOne({$pull: {favorite: productId}});
            }else{
                user.favorite.push(productId);
            }
            await user.save();
            res.redirect(`/product/${id}`);
        } catch (error) {
            res.render('error/index.ejs', {error});
        }
    }

}

module.exports = UserController;
