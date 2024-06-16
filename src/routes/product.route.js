const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const ProductSchema = require('../models/product.model');
const CategorySchema = require('../models/category.model');
const ProductController = require('../controller/product.controller');

const {storage, cloudinary} = require('../cloudinary/index');
const multer = require('multer');
const upload = multer({storage: storage});

//trang sản phẩm
router.get('/', ProductController.getAll);

//form tạo mới sản phẩm
router.get('/new', ProductController.renderCreate);

//form sửa sản phẩm
router.get('/:id/edit', ProductController.renderUpdate);

//form chi tiết sản phẩm
router.get('/:id', ProductController.renderDetails);

router.put('/:id/favorite', ProductController.updateFavorite);

//tạo mới sản phẩm
router.post('/new', upload.array('image'), ProductController.createProduct);

//sửa sản phẩm
router.put('/:id/edit', upload.array('image'), ProductController.updateProduct);


//xóa sản phẩm
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;