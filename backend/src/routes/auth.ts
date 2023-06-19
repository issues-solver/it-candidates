import express from 'express';

import { postSignup, postSignin, postLogout, getUser, updateUser } from '../controllers/auth.js';
import { SignupValidators, SigninValidators } from '../validation/auth.js';
import { verifyToken } from '../middlewares/auth.js';
import { UserValidators } from '../validation/user.js';

const router = express.Router();

router.post('/api/signup', SignupValidators, postSignup);

router.post('/api/signin', SigninValidators, postSignin);

router.post('/api/logout', postLogout);

router.get('/api/user', verifyToken, getUser);

router.put('/api/user', verifyToken, UserValidators, updateUser);

export default router;
