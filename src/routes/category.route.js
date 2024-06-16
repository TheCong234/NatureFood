const express = require('express');
const router = express.Router({mergeParams: true});
const CategoryModel = require('../models/category.model');
const CategoryController = require('../controller/category.controller');
const {storage} = require('../cloudinary/index');
const multer = require('multer');
const upload = multer({storage: storage});

//getter
router.get('/', CategoryController.getCategories);

router.get('/new', CategoryController.renderAdd);

router.get('/:id', CategoryController.renderEdit);

router.post('/new', upload.single('image'), CategoryController.creatCategory);

router.put('/:id', upload.single('image'), CategoryController.update);

router.delete('/:id', CategoryController.delete);





module.exports = router;