const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const CategoryModel = require('../models/category.model');
const {storage} = require('../cloudinary/index');
const multer = require('multer');
const upload = multer({storage: storage});

//getter
router.get('/', catchAsync((req, res,next)=>{
    res.send("heheh");
}));

router.get('/new', catchAsync((req, res, next)=>{
    res.render('category/category.new.ejs');
}))

router.get('/:id', catchAsync(async(req, res,next)=>{
    const {id} = req.params;
    const category = await CategoryModel.findById(id);
    res.render('category/category.edit.ejs',{category});
}));



router.post('/new', upload.single('image'), catchAsync(async(req, res, next)=>{
    const newCategory = new CategoryModel(req.body.category);
    const img = req.file;
    newCategory.image = {url: img.path, filename: img.filename}
    await newCategory.save();
    res.redirect('/category/new');
}))

// router.post('/new', catchAsync(async(req, res, next)=>{
    
//     res.redirect('/category/new');
// }))

router.put('/:id', catchAsync(async(req, res, next)=>{
    const {id} = req.params;
    res.send(`Put id: ${id}`);
}))



router.delete('/:id', catchAsync(async(req, res, next)=>{
    const {id} = req.params;
    res.send(`Delete id: ${id}`);
}))





module.exports = router;