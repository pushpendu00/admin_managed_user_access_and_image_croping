const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { boolean } = require('webidl-conversions');

const upload_location = path.join("/uploads/avatar");

const schema = new mongoose.Schema({
    name : {
        type : String,
        // required : true,
        default : "--"
    },
    avatar : {
        type : String,
        default : ''
    },
    userId : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    accepted : {
        type : Boolean,
        default : false
    }
},{timestamps : true});


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      try {
        // console.log(path.join(__dirname));
        cb(null, path.join(__dirname, "..", upload_location));
      } catch (err) {
        console.log("multer error destination = " + err);
        return;
      }
    },
    filename: function (req, file, cb) {
      try {
        let new_file_name = path.join(req.id + "-" + Date.now());
        // +'.'+file.mimetype.split('/')[1]);
        // console.log(" New file name = "+new_file_name);
        cb(null, new_file_name);
      } catch (err) {
        console.log("multer error file name =" + err);
        return;
      }
    },
  });
  
  // Static file
  schema.statics.upload_photo = multer({ storage: storage }).single(
    "uploadPhoto",
  );
  schema.statics.upload_path = upload_location;

const userModel = mongoose.model('user',schema);

module.exports = userModel;