import { check } from 'express-validator';
import { handleValidationErrors } from './util.js';

export const CandidateValidators = [
    check('fullName')
        .notEmpty().withMessage('Full Name is required'),
    check('recruiterContact')
        .notEmpty().withMessage('Recruiter Contact is required'),
    check('skills')
        .notEmpty().withMessage('Skills are required')
        .isArray({min: 1}).withMessage('At least one skill is required'),
    check('contacts')
        .notEmpty().withMessage('Contacts are required')
        .isArray({min: 1}).withMessage('At least one contact is required'),
    handleValidationErrors,
];
