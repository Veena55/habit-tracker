const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

router.get('/', homeController.home);
router.get('/home', homeController.main);
router.use('/users', require('./users'));

module.exports = router;