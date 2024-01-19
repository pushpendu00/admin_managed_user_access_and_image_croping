
const multer = require("multer");
const path = require("path");

const upload_location = path.join("/uploads/avatar");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      try {
        // console.log(req.body);
        cb(null, path.join(__dirname, "..", upload_location));
      } catch (err) {
        // console.log("multer error destination = " + err);
        return;
      }
    },
    filename: function (req, file, cb) {
      try {
        let new_file_name = path.join(req.id + "-" + Date.now());
        cb(null, new_file_name);
      } catch (err) {
        // console.log("multer error file name =" + err);
        return;
      }
    },
  });

  const upload_photo = multer({ storage: storage });
  

  module.exports = upload_photo;