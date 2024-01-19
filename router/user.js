const authUser = require('../middleware/authUser');
const upload_photo = require('../middleware/upload-avatar');

const router = require('express').Router();


router.get('/login',require('../controllers/userController').loginPage);

router.post('/login',require('../controllers/userController').login);

router.post('/upload',authUser,upload_photo.single('uploadPhoto'),require('../controllers/userController').upload);

router.get('/',authUser,require('../controllers/userController').user);

module.exports = router;