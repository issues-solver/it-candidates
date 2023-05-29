const { check } = require('express-validator');
const { handleValidationErrors } = require("./util");

const passwordMinLength = 6;

const SignupValidators = [
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email'),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({min: passwordMinLength}).withMessage('Password must be at least 6 characters long'),
    check('firstName')
        .notEmpty().withMessage('First name is required'),
    check('lastName')
        .notEmpty().withMessage('Last name is required'),
    check('contacts')
        .notEmpty().withMessage('Contacts are required')
        .isArray({min: 1}).withMessage('At least one contact is required'),
    handleValidationErrors
];

const SigninValidators = [
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email'),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({min: passwordMinLength}).withMessage('Password must be at least 6 characters long'),
    handleValidationErrors,
];

exports.SignupValidators = SignupValidators;
exports.SigninValidators = SigninValidators;
