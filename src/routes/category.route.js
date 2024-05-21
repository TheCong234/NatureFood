const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const CategoryModel = require('../models/category.model');
const multer = require('multer');
const {cloudinary, storage} = require('../cloudinary/index');
const upload = multer({storage});

router.get('/', catchAsync((req, res,next)=>{
    res.send("heheh");
}));

router.get('/new', catchAsync((req, res, next)=>{
    res.render('category.ejs');
}))

router.post('/new', upload.array('image'), catchAsync(async(req, res, next)=>{
    const newCategory = new CategoryModel(req.body.category);
    const img = req.file;
    newCategory.image = {url: img.path, filename: img.filename}



    // 21.05
    await newCategory.save();
    res.redirect('category/new');
}))



module.exports = router;