const express = require('express');

const authController = require('../controllers/auth');

const { SignupValidators, SigninValidators } = require('../validation/auth');
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();

router.post('/api/signup', SignupValidators, authController.postSignup);

router.post('/api/signin', SigninValidators, authController.postSignin);

router.post('/api/logout', authController.postLogout);

router.get('/api/user', verifyToken, authController.getUser);

module.exports = router;
