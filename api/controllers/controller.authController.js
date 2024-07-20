import collection from '../models/model.user.js';
import hashData from '../utils/hashData.js';
import bcrypt from 'bcrypt';

const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const checkUser = await collection.findOne({ email });
        if (checkUser) {
            return res.status(400).json({ message: 'User already exists. Please Sign in.' });
        }

        const hashedPassword = await hashData(password);
        const newUser = new collection({
            email,
            username,
            password: hashedPassword,
            verified: true,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const checkUser = await collection.findOne({ email });
        if (!checkUser) {
            return res.status(400).json({ message: 'User does not exist. Please Register.' });
        }

        const isPasswordValid = await bcrypt.compare(password, checkUser.password);
        if (isPasswordValid) {
            return res.status(200).json({ message: 'Login Successful' });
        } else {
            return res.status(400).json({ message: 'Invalid Login' });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { register, login };
