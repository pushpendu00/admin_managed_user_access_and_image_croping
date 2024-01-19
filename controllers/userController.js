const path = require("path");
const userModel = require("../models/userModel");
const { verify_hash_password } = require("../utils/hash");
const { create_jwt_token } = require("../utils/jwt");
const fs = require('fs');

module.exports.loginPage = (req,res)=>{
    try{
        if(req.cookies.token){
            return res.redirect('/user');
        }
        return res.render('userLogin');
    }catch(err){
        res.send({
            status : 502,
        });
    }
}

module.exports.login = async(req,res)=>{
    try{
        const {userId, password} = req.body;
        // console.log(userId, password);
        let user = await userModel.findOne({userId : userId});
        // if user not registered
        if(!user){
            return res.send({
                status : 403,
                message : "User not registered"
            });
        }

        let isVerify = await verify_hash_password(password, user.password);
        if(!isVerify){
            return res.send({
                status : 401,
                message : "Incorrect Password"
            });
        }
        const token = await create_jwt_token(user.userId);
        // store jwt token in cookie
        res.cookie('token',token,{
            expires : new Date(Date.now()+2592000000),
            httpOnly : true
        });
        return res.redirect('/user');
    }catch(err){
        console.log(err)
        res.send({
            status : 502,
        });
    }
}


module.exports.user = async(req,res)=>{
    try{
        const user = await userModel.findOne({userId : req.id});
        if(!user){
            res.clearCookie('token');
            return res.redirect('/user');
        }
        return res.render('user',{
            user
        });
    }catch(err){
        res.send({
            status : 502,
        });
    }
}

module.exports.upload = async (req,res)=>{
    try{
        // console.log(req.body);
        // console.log("hello ",req.file)
        const user = await userModel.findOne({userId : req.id });
        if(!user){
            return res.redirect('back');
        }

        let unlink_photo_path = await userModel.findOne({userId : req.id});
        // console.log(unlink_post_path);
        // delete post image from stored location
        if(unlink_photo_path.avatar !== ""){
            fs.unlinkSync(path.join(__dirname,"..",unlink_photo_path.avatar));
        }


        await userModel.findOneAndUpdate({userId : req.id},{
            avatar : "/uploads/avatar/"+req.file.filename,
            name : req.body.name,
        })
        return res.redirect('back');
        // return res.send({
        //     status : 200,
        //     message : "Successfully submited....",
        // });
    }catch(err){
        console.log(err)
        res.send({
            status : 502,
        });
    }
}