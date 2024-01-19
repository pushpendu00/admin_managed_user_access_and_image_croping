const path = require("path");
const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel");
const { create_hash_password, verify_hash_password } = require("../utils/hash");
const { create_jwt_token } = require("../utils/jwt");
const fs = require('fs');

module.exports.loginPage = (req,res)=>{
    try{
        if(req.cookies.token){
            return res.redirect('/admin');
        }
        return res.render('adminLogin');
    }catch(err){
        res.send({
            status : 502,
        });
    }
}


module.exports.login = async (req,res)=>{
    try{
        const {email, password} = req.body;
        let admin = await adminModel.findOne({email : email});
        // if user not registered
        if(!admin){
            return res.send({
                status : 403,
                message : "Admin not registered"
            });
        }

        let isVerify = await verify_hash_password(password, admin.password);
        if(!isVerify){
            return res.send({
                status : 401,
                message : "Incorrect Password"
            });
        }
        const token = await create_jwt_token(admin.email);
        // store jwt token in cookie
        res.cookie('token',token,{
            expires : new Date(Date.now()+2592000000),
            httpOnly : true
        });
        return res.redirect('/admin');
    }catch(err){
        console.log(err)
        res.send({
            status : 502,
        });
    }
}


module.exports.admin = (req,res)=>{
    try{
        return res.render('admin');
    }catch(err){
        res.send({
            status : 502,
        });
    }
}


module.exports.create_user = async (req,res)=>{
    try{
        const {id,password} = req.body;
        const response = await userModel.findOne({userId : id});
        if(response){
            return res.send({
                status : 402,
                message : "User already exits"
            });
        }
        const hassPass = await create_hash_password(password);
        const newUser = userModel({
            userId : id,
            password : hassPass,
        });
        await newUser.save();
        return res.send({
            status : 200,
            message : "Sussfully Created User"
        });
    }catch(err){
        console.log(err)
        res.send({
            status : 502,
            message : "User Not Created"
        });
    }
}



module.exports.view = async(req,res)=>{
    try{
        const{userId1, userId2} = req.body;
        const arr = [userId1, userId2];
        // console.log(userId1, userId2);
        const result = await userModel.find({userId : {$in:arr}});
        // console.log(result);
        return res.render('admin-view',{
            users : result
        });
    }catch(err){
        console.log(err)
        res.send({
            status : 502,
        });
    }
}


module.exports.accepted = async (req,res)=>{
    try{
        const user = await userModel.findOne({userId : req.body.id});
        if(!user){
            return res.send({
                status : 404,
                message : "User Already Deleted"
            })
        }
        await userModel.findByIdAndUpdate({_id : user._id},{
            accepted : true
        });
        // console.log("update")
        return res.send({
            status : 200,
            message : "Successfully update"
        })
    }catch(err){
        // console.log(err)
        return res.send({
            status : 502,
            message : "Internal Server Error"
        })
    }
}


module.exports.delete = async (req,res)=>{
    try{
        const user = await userModel.findOne({userId : req.body.id});
        if(!user){
            return res.send({
                status : 200,
                message : "User Already Deleted"
            })
        }

        if(user.avatar !== ""){
            fs.unlinkSync(path.join(__dirname,"..",user.avatar));
        }
        await userModel.findByIdAndDelete({_id : user._id});
        return res.send({
            status : 200,
            message : "Successfully Deleted"
        })
    }catch(err){
        console.log(err)
        return res.send({
            status : 502,
            message : "Internal Server Error"
        })
    }
}