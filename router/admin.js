// const auth = require('../middleware/authUser');

const authAdmin = require('../middleware/authAdmin');

const router = require('express').Router();

router.get('/',authAdmin,require('../controllers/adminController').admin);

router.post('/create-user',authAdmin, require('../controllers/adminController').create_user);

router.post('/view',authAdmin, require('../controllers/adminController').view);

router.post('/accepted',authAdmin,require('../controllers/adminController').accepted);

router.post('/delete',authAdmin,require('../controllers/adminController').delete)

router.get('/login',require('../controllers/adminController').loginPage);

router.post('/login',require('../controllers/adminController').login);

module.exports = router;