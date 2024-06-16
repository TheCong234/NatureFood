const ProductModel = require('../models/product.model');
const CategoryModel = require('../models/category.model');
const UserModel = require('../models/user.model');
const { cloudinary } = require('../cloudinary');

const ProductController = {
    async renderCreate(req, res, next){
        try {
            const categories = await CategoryModel.find({});
            res.render('products/new.product.ejs',{categories});
        } catch (error) {
            res.render('error/index.ejs', {error});
        }
    },

    async renderUpdate(req, res, next){
        try {
            const {id} = req.params;
            const product = await ProductModel.findById(id);
            const categories = await CategoryModel.find({});
            res.render('products/edit.product.ejs', {product, categories});
        } catch (error) {
            res.render('error/index.ejs', {error});
        }
    },
    
    async renderDetails(req, res, next){
        try {
            const {id} = req.params;
            const product = await ProductModel.findById(id).populate('reviews');
            res.render('products/details.product.ejs', {product});
        } catch (error) {
            res.render('error/index.ejs', {error});
        }
    },

    async createProduct(req, res, next){
        try {
            const newProduct = new ProductModel(req.body.product);
            newProduct.images = req.files.map(f => ({url: f.path, filename: f.filename}));
            await newProduct.save();
            req.flash('success', 'Tạo mới sản phẩm thành công');
            res.redirect('/product/new');
        } catch (error) {
            
        }
        
    },

    async getAll(req, res, next){
        try {
            const products = await ProductModel.find({}).populate('images');
            const categories = await CategoryModel.find({});
            res.render('products',{products, categories});
        } catch (error) {
            res.render('error/index.ejs', {error});
        }
        
    },

    async updateProduct(req, res, next){
        try {
            const {id} = req.params;
            const product = await ProductModel.findByIdAndUpdate(id, req.body);
            if(req.files){
                const imgs = req.files.map(f=>({url: f.path, filename: f.filename}));
                product.images.push(...imgs);
                await product.save();
            }
            
            if(req.body.imageDelete){
                for(let filename of req.body.imageDelete){
                    await cloudinary.uploader.destroy(filename);
                }
                await product.updateOne({$pull: {images: {filename: {$in: req.body.imageDelete}}}});
            }
            req.flash('success', 'Cập nhật sản phẩm thành công.');
            res.redirect(`/product/${id}`);
            
        } catch (error) {
            req.flash('error', `Cập nhật sản phẩm không thành công: ${error}`);
            res.redirect(`product/${req.params.id}/edit`);
        }
    },

    

    async updateFavorite(req, res, next){
        try {
            const {id} = req.params;
            const userId = req.user._id;
            const user =  await UserModel.findById(userId).populate('favorite');
            const favoriteExist = user.favorite.some(fav => fav._id.toString() === id) 
            if(favoriteExist){
                await user.updateOne({$pull: {favorite: id}});
                req.flash('success', 'Bỏ yêu thích thành công');
            }else{
                user.favorite.push(id);
                req.flash('success', 'Thêm vào danh sách yêu thích thành công');
            }
            await user.save();
            res.redirect(`/product/${id}`);
        } catch (error) {
            req.flash('error', `Thêm yêu thích không thành công: ${error}`);
            res.redirect(`/product/${req.params.id}`);
        }
    },

    async deleteProduct(req, res, next){
        try {
            const {id} = req.params;
            const product = await ProductModel.findById(id);
            await product.images.forEach(i => cloudinary.uploader.destroy(i.filename));
            await ProductModel.findByIdAndDelete(id);
            req.flash('success', 'Xóa sản phẩm thành công');
            res.redirect('/product');
            
        } catch (error) {
            req.flash('error', 'Xóa sản phẩm không thành công');
            res.redirect(`/product/${req.params.id}/edit`);
        }
    }
}

module.exports = ProductController;