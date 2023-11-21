// Server setup for app
const express = require('express');
const app = express();
const PORT = 8000;
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongodb-session')(session);
const passportGoogle = require('./config/passport-google-oauth2-strategy');
// const passportLocal = require('./config/passport-local-strategy');


// setup layout for view
const expressLayout = require('express-ejs-layouts');
app.use(express.urlencoded());
app.use(express.static('assets'));
app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScript', true);

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({ secret: 'SECRET', 
resave: false ,
saveUninitialized: false ,
cookie : {
    maxAge: 1000* 60 * 60 *24 * 365
} ,
     store : new MongoStore({
        uri: 'mongodb://0.0.0.0:27017/habits',
        collection: 'mySessions'
      })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));


process.on('uncaughtException', err => {
    console.log(`Uncaught Exception: ${err.message}`)
    process.exit(1)
})

app.listen(PORT,(err)=>{
    if(err) {
        console.log("Something went wrong!!"+err);
    }
    console.log(`Congratulations! Server is running on PORT ${PORT}`);
})