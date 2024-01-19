const router = require('express').Router();

router.get('/',require('../controllers/homeController').home);

router.use('/admin',require('./admin'));

router.use('/user',require('./user'));

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.redirect('/');
})

module.exports = router;