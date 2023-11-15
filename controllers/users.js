module.exports.allUsers = (req,res)=>{
    console.log("HI");
}

module.exports.signin = (req,res)=>{
    if (req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.render('signin',{
        title:"Sign-In"
    });
}

module.exports.createSession = (req,res) => {
    console.log("Logged in successfully!");
    return res.redirect('/');
}

module.exports.logout = (req,res)=>{
    if(req.session.passport){ delete req.session.passport; }
            
    req.session.destroy(function (err) {
        // req.logout();
        // req.logOut();
        req.session = null;
        res.clearCookie('connect.sid');
        res.redirect('/users/sign-in'); 
    });
}