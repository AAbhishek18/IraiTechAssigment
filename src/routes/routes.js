const express = require('express');
const router = express.Router();

const commonController = require('../controllers/commonController');



router.post('/signup', commonController.createUser);//signup user
router.post('/login', commonController.loginUser);//login user

router.get('/getAllUsers', commonController.getAllUsers);//get all users

module.exports = router;
