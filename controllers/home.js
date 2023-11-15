module.exports.main = (req,res)=>{
    // console.log(res.locals.user);
    return res.render('home',{
        title : "Home"
    });
}

module.exports.home = (req,res)=>{
    return res.redirect('/home');
}