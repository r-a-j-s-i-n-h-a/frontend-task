import OTPVerification from '../models/model.OTPverification.js';
import sendEmail from './sendEmail.js';
import generateOTP from './generateOTP.js';
import hashData from './hashData.js';

const sendOTPVerificationEmail = async ({ _id, email }) => {
    try {
        const otp = generateOTP();

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the signup process</p>
                   <p>This code <b>expires in 9 minutes</b>.</p>`
        };

        const hashedOtp = await hashData(otp);
        const newOTPVerification = new OTPVerification({
            userId: email,
            otp: hashedOtp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 9 * 60 * 1000
        });

        await newOTPVerification.save();
        await sendEmail(mailOptions);

        return { userId: _id, email };
    } catch (error) {
        console.error('Error sending OTP email:', error.message);
        throw new Error('Failed to send OTP email');
    }
};

export default sendOTPVerificationEmail;
