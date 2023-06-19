
import jwt from 'jsonwebtoken';

import config from '../config.js';
import { RequestWithUserId, OriginalResponse, OriginalNextFunction, OriginalRequest } from '../models/common.js';

export const verifyToken = (req: OriginalRequest, res: OriginalResponse, next: OriginalNextFunction) => {
    const token = req.headers.authorization?.split(' ')?.[1]; // Assuming the token is passed in the Authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, config.jwtSecret) as jwt.JwtPayload;

        // Attach the user object to the request
        (req as RequestWithUserId).userId = decoded.userId;

        // Move to the next middleware or route handler
        next();
    } catch (err) {
        // Handle error
        console.error(err);
        res.status(401).json({ message: 'Invalid token' });
    }
};
