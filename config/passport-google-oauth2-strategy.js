const passport = require('passport');
const googleStartegy =  require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User =  require('../models/user');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

//tell the passport to use the google strategy for login
passport.use(new googleStartegy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: CALLBACK_URL
},

async function(accessToken,refreshToken,profile,done) {
    try {
        const user = await User.findOne({email:profile.emails[0].value});
        // console.log(profile,"accessToken="+accessToken,"RefreshTokn="+refreshToken);
        if(user) {
            //if found, set this user as req.user i.e. signin that user
            return done(null, user);
        } else {
            //if not found then create new user in database & set it as req.user 
            const createUser = await User.create({
                name:profile.displayName,
                email:profile.emails[0].value
            });
            return done(null,user);
        }
    } catch (error) {
        console.log("Something went wrong!"+error);
        return;
    }
}
));

passport.serializeUser((user,done)=>{
    console.log(`\n-----> Serialize User.`);
    // console.log(user);
     // The USER object is the "authenticated user" from the done() new Google Startegy function.
     // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.
     done(null,user);
});

// deserializing the user from the key in the cookies
passport.deserializeUser((user,done)=>{
    console.log(`\n-----> Deserialize User.`);
    // console.log(user);
    // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
    // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.
    done(null,user);
})

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        res.locals.user = req.user._id;
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user._id;
    }

    next();
}

module.exports=passport;
