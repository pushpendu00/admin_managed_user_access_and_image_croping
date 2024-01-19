const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
},{timestamps : true});

const adminModel = mongoose.model('admin',schema);

module.exports = adminModel;