import { check } from 'express-validator';
import { handleValidationErrors } from './util.js';

export const UserValidators = [
    check('firstName')
        .notEmpty().withMessage('First Name is required'),
    check('lastName')
        .notEmpty().withMessage('Last Name is required'),
    check('email')
        .notEmpty().withMessage('Email is required'),
    check('contacts')
        .notEmpty().withMessage('Contacts are required')
        .isArray({ min: 1 }).withMessage('At least one contact is required'),
    handleValidationErrors,
];
