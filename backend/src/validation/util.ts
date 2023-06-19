import { validationResult } from 'express-validator';
import { OriginalNextFunction, OriginalRequest, OriginalResponse } from '../models/common.js';

export const handleValidationErrors = (req: OriginalRequest, res: OriginalResponse, next: OriginalNextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
