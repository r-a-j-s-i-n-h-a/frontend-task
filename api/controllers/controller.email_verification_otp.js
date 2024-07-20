import bcrypt from 'bcrypt';
import OTPVerification from '../models/model.OTPverification.js';
import User from '../models/model.user.js';
import sendOTPVerificationEmail from '../utils/sendOTPVerificationEmail.js';
import { setLatestEmail, getLatestEmail } from '../utils/latestEmail.js';

export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw new Error("Email is required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid request. Please register first.' });
        }

        await OTPVerification.deleteMany({ userId: email });
        const emailData = await sendOTPVerificationEmail({ _id: email, email });

        setLatestEmail(email);

        res.json({
            status: "PENDING",
            message: "Verification email sent",
            data: emailData
        });
    } catch (error) {
        console.error('Error in sendOTP:', error.message);
        res.json({
            status: "FAILED",
            message: error.message
        });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { otp } = req.body;
        if (!otp) {
            throw new Error("OTP is required");
        }

        const email = getLatestEmail();
        if (!email) {
            throw new Error("No email found for verification");
        }

        const otpVerification = await OTPVerification.findOne({ userId: email }).sort({ createdAt: -1 });
        if (!otpVerification) {
            throw new Error("OTP verification record not found");
        }

        if (Date.now() > otpVerification.expiresAt) {
            await OTPVerification.deleteMany({ userId: otpVerification.userId });
            throw new Error("OTP has expired. Please request a new one.");
        }

        const validOTP = await bcrypt.compare(otp, otpVerification.otp);
        if (!validOTP) {
            throw new Error("Invalid OTP. Please check and try again.");
        }

        await User.updateOne({ email: otpVerification.userId }, { verified: true });

        res.json({
            status: "VERIFIED",
            message: "Account verified successfully."
        });
    } catch (error) {
        console.error('Error in verifyOTP:', error.message);
        res.json({
            status: "FAILED",
            message: error.message
        });
    }
};

export const resendOTP = async (req, res) => {
    try {
        const email = getLatestEmail();
        if (!email) {
            throw new Error("No email found for resending OTP");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid request. Please register first.' });
        }

        await OTPVerification.deleteMany({ userId: email });
        const emailData = await sendOTPVerificationEmail({ _id: email, email });

        res.json({
            status: "PENDING",
            message: "Verification email resent",
            data: emailData
        });
    } catch (error) {
        console.error('Error in resendOTP:', error.message);
        res.json({
            status: "FAILED",
            message: error.message
        });
    }
};
