import bcrypt from 'bcrypt';
import User from '../models/model.user.js';
import { getLatestEmail } from '../utils/latestEmail.js';

export const resetPassword = async (req, res) => {
    const { password, confirmPassword } = req.body;

    try {
        if (!password || !confirmPassword) {
            return res.status(400).json({ message: 'Passwords are required' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const email = getLatestEmail();
        if (!email) {
            return res.status(400).json({ message: 'No email found for password change' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.updateOne({ email }, { password: hashedPassword });

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error resetting password:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
