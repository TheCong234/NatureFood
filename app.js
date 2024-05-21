if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.engine('ejs', engine);
app.use(express.static(path.join(__dirname, 'src/public')));

// Mongoose
mongoose.connect(DB_URL);
const db = mongoose.connection();
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("data connected");
})

app.get('/test', (req, res)=>{
    const datas = "cong nè";
    res.render('home.ejs', {datas});
})

app.listen(3000, ()=>{
    console.log("SERVER ON PORT: 3000");
})