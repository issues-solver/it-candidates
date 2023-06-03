const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const config = require('../config');

const postSignup = async (req, res) => {
    // TODO: Add server validation
    try {
        const { email, password, firstName, lastName, contacts } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({ email, password: hashedPassword, firstName, lastName, contacts });
        await newUser.save();

        // Generate a JWT token
        const accessToken = jwt.sign({ userId: newUser._id }, config.jwtSecret, { expiresIn: '1h' });
        res.json({ accessToken });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const postSignin = async (req, res) => {
    // TODO: Add server validation
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const accessToken = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });

        // Set the token as a cookie
        res.cookie('accessToken', accessToken, { httpOnly: true });

        res.json({ accessToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const postLogout = (req, res) => {
    res.json({ message: 'Logged out successfully' });
};

const getUser = async (req, res) => {
    const user = await User.findOne({ _id: req.userId});
    res.status(200).json(user);
};

exports.postSignup = postSignup;
exports.postSignin = postSignin;
exports.postLogout = postLogout;
exports.getUser = getUser;
