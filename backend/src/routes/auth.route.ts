import express from 'express';
import { checkAuth, generateOtp, login, signup } from '../controllers/auth.controller';
import { protectedRoute } from '../middlewares/protected.middleware';

const router=express.Router();

router.post('/request-otp', generateOtp);
router.post('/signup', signup);
router.post('/login', login);
router.post('/checkAuth', protectedRoute, checkAuth);

export default router;