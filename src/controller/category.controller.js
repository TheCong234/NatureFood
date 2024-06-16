const { cloudinary } = require('../cloudinary');
const CategoryModel = require('../models/category.model');

const CategoryController = {
    async renderAdd(req, res){
        res.render('category/new.category.ejs');
    },

    async renderEdit(req, res,next){
        try {
            const {id} = req.params;
            const category = await CategoryModel.findById(id);
            return res.render('category/edit.category.ejs',{category});
        } catch (error) {
            res.render('error/index.ejs', {error});
        }
        
    },

    async creatCategory(req, res, next){
        try {
            const newCategory = new CategoryModel(req.body.category);
            const img = req.file;
            newCategory.image = {url: img.path, filename: img.filename}
            await newCategory.save();
            req.flash('error', 'Thêm mới danh mục thành công');
            res.redirect('/category/new');
        } catch (error) {
            req.flash('error', `Thêm mới danh mục không thành công ${error}`);
            res.redirect('/category/new');
        }
        
    },

    async getCategories(req, res, next){
        try {
            const categories = await CategoryModel.find({});
            res.send(categories);
        } catch (error) {
            res.render('error/index.ejs', {error});
        }
    },

    async  update(req, res, next){
        try {
            const {id} = req.params;
            const category = await CategoryModel.findByIdAndUpdate(id, req.body.category);
            if(req.file?.path){
                await cloudinary.uploader.destroy(category.image.filename);
                category.image = {url: req.file.path, filename: req.file.filename};
                category.save();
            }
            req.flash('success', 'Cập nhật danh mục thành công');
            res.redirect(`/category/${id}`);
        } catch (error) {
            req.flash('error', `Cập nhật danh mục thất bại: ${error}`);
            res.redirect(`/category/${req.params.id}`);
        }
    },

    async delete(req, res, next){
        const err = 'Đang cập nhật chức năng này';
        res.render('error/index.ejs', {err});
    }

}

module.exports = CategoryController;