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

//get the signup data
module.exports.create = async (req,res) => {
    try {
        
        if(req.body.password != req.body.confirm_password) {
         return res.redirect('back');
        }
        let user = await User.findOne({email: req.body.email});     
         if(!user) {
             const result = await User.create(req.body);
        return res.redirect('/users/signin');
    } else {
        return res.redirect('back');
    }
    } catch (error) {
        console.log("Something went wrong while signup", error);
    }
    

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

module.exports.myProfile = (req,res) => {
    return res.render('profile', {
        title : "My Profile"
    })
}