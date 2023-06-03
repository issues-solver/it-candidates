const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')?.[1]; // Assuming the token is passed in the Authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, config.jwtSecret);

        // Attach the user object to the request
        req.userId = decoded.userId;

        // Move to the next middleware or route handler
        next();
    } catch (err) {
        // Handle error
        console.error(err);
        res.status(401).json({ message: 'Invalid token' });
    }
};

exports.verifyToken = verifyToken;
