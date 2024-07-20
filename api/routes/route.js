import express from 'express';
import { register, login } from '../controllers/controller.authController.js';
import { sendOTP, verifyOTP, resendOTP } from '../controllers/controller.email_verification_otp.js';
import { resetPassword } from '../controllers/controller.resetPassword.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/resetPassword', resetPassword);

export default router;
