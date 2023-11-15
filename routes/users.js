const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const passport = require('passport');

router.get('/sign-in', userController.signin);

router.post('/logout', userController.logout);

router.get('/auth/google', passport.authenticate('google',{scope:['profile','email'], prompt : "select_account"}));

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/users/sign-in'}),userController.createSession);


module.exports = router;