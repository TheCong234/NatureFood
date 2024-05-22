const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ProductSchema = require('../models/product.model');
const CategorySchema = require('../models/category.model');

const {storage, cloudinary} = require('../cloudinary/index');
const multer = require('multer');
const upload = multer({storage: storage});

//trang sản phẩm
router.get('/', catchAsync(async(req, res, next)=>{
    const products = await ProductSchema.find({});
    const categories = await CategorySchema.find({});
    res.render('products',{products, categories});
}))

//form tạo mới sản phẩm
router.get('/new', catchAsync(async(req, res, next)=>{
    const categories = await CategorySchema.find({});
    res.render('products/product.new.ejs',{categories});
}))

//form sửa sản phẩm
router.get('/:id/edit', catchAsync(async(req, res, next)=>{
    const {id} = req.params;
    const product = await ProductSchema.findById(id);
    res.render('products/product.edit.ejs', {product});
}))

//form chi tiết sản phẩm
router.get('/:id', catchAsync(async(req, res, next)=>{
    const {id} = req.params;
    const product = await ProductSchema.findById(id);
    res.render('products/product.detail.ejs', {product});
}))

//tạo mới sản phẩm
router.post('/new', upload.array('image'), catchAsync(async(req, res, next)=>{
    const newProduct = new ProductSchema(req.body.product);
    newProduct.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    await newProduct.save();
    res.redirect('/product/new');
}));

//sửa sản phẩm
router.put('/:id/edit', catchAsync(async(req, res, next)=>{
    const {id} = req.params;
    const product = await ProductSchema.findByIdAndUpdate(id, req.body);
    const imgs = req.files.map(f=>({url: f.path, filename: f.filename}));
    product.images.push(...imgs);
    if(req.body.imageDelete){
        for(let filename of req.body.imageDelete){
            await cloudinary.uploader.destroy(filename);
        }
        await product.updateOne({$pull: {images: {filename: {$in: req.body.imageDelete}}}});
    }
    res.redirect(`/product/${id}`);
}))


//xóa sản phẩm
router.delete('/:id', catchAsync(async(req, res, next)=>{
    const {id} = req.params;
    await ProductSchema.findByIdAndDelete(id);
    res.redirect('/product');
}))

module.exports = router;