const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const passport = require('passport');

router.get('/sign-in', userController.signin);

router.get('/profile', userController.myProfile);

router.post('/logout', userController.logout);

router.get('/auth/google', passport.authenticate('google',{scope:['profile','email'], prompt : "select_account"}));

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/users/sign-in'}),userController.createSession);

// router.post('/create', userController.create);
// router.post('/create-session', passport.authenticate('local', {failureRedirect : '/users/sign-in'}) ,userController.createSession);

module.exports = router;