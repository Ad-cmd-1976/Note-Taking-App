import express from 'express';
import { checkAuth, generateSignupOtp, login, generateLoginOtp, signup } from '../controllers/auth.controller';
import { protectedRoute } from '../middlewares/protected.middleware';

const router=express.Router();

router.post('/request-signup-otp', generateSignupOtp);
router.post('/signup', signup);
router.post('/request-login-otp', generateLoginOtp);
router.post('/login', login);
router.post('/checkAuth', protectedRoute, checkAuth);

export default router;