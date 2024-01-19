
module.exports.home = (req,res)=>{
    try{
        // if(req.cookies.token){
        //     return res.redirect('back');
        // }
        return res.render('home');
    }catch(err){
        res.send({
            status : 502,
        });
    }
}