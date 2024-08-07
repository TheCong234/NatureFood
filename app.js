if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
const categoryRouter = require('./src/routes/category.route');
const productRouter = require('./src/routes/product.route');
const userRouter = require('./src/routes/user.route');
const reviewRouter = require('./src/routes/review.route');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const ExpressError = require('./src/utils/expressError');
const MongoStore = require('connect-mongo');
const CategoryModel = require('./src/models/category.model');
const ProductModel = require('./src/models/product.model');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.engine('ejs', engine);
app.use(express.static(path.join(__dirname, 'src/public')));

// Mongoose
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("data connected");
})

//session
const store = MongoStore.create({
    mongoUrl: DB_URL,
    touchAfter: 24 * 60 * 60,
    crypto:{
    secret: 'thisisasecret'
    }
})
store.on("error", function(e){
    console.log("Session store error", e);
})

const sessionConfig = {
    store,
    name:'session',
    secret: 'thisisasecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 *24 *7,
        maxAge: 1000 * 60 * 60 *24 *7
    }
}
app.use(session(sessionConfig));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//API
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/product/:id/review', reviewRouter);
app.use('/user', userRouter);

app.get('/home', async(req, res)=>{
    const categories = await CategoryModel.find({});
    const products = await ProductModel.find({}).limit(4);
    res.render('home.view.ejs', 
        {
            
            title: 'Trang chủ', 
            cssPath: 'css/home.view.css',
            categories, 
            products,
        });
})

app.get('/dashboard', (req, res)=>{
    res.render('dashboard.view.ejs');
})

app.all('*', (req, res, next) => {
    res.render('test.ejs',
        {
            title:'test',
            cssPath: 'test'
        });
    
})



app.listen(3000, ()=>{
    console.log("SERVER ON PORT: 3000");
})