const express = require('express');

require('dotenv').config();
require('./config/mongoDB').connectFun();
const cookieParser = require('cookie-parser');
const port = 4400;

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended : true}));

// set views file direct accessing
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookieParser());

app.use('/',require('./router/index'))

app.use(express.static("./assets"));

app.use("/uploads", express.static(__dirname + "/uploads"));

app.listen(port,(err)=>{
    if(err){
        console.log("Server is not Running");
        return;
    }
    console.log(`Server is Running on Port ${port}`);
})