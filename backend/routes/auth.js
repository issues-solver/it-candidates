const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/api/signup', authController.postSignup);

router.post('/api/signin', authController.postSignin);

router.post('/api/logout', authController.postLogout);

module.exports = router;
