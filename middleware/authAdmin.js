

const {verify_jwt_token} = require('../utils/jwt');
const adminModel = require('../models/adminModel');

const authAdmin = async (req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            // return res.status(200).send({
            //     message : "Token not found"
            // })
            return res.redirect('/admin/login');
        }
        let user = await verify_jwt_token(token);
        let authUser = await adminModel.findOne({email : user.userId});
        if(!authUser){
            // return res.status(404).send({
            //     message : "User not found"
            // })
            console.log("hello")
            res.clearCookie('token');
            return res.redirect('/admin');
        }
        req.id = user.userId;
        // console.log("user page access");
        next();
    }catch(err){
        console.log(err);
        return res.send({
            message : "Authentication Error"
        })
    }
}
module.exports = authAdmin;