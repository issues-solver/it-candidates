const { check } = require("express-validator");
const { handleValidationErrors } = require("./util");

const UserValidators = [
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

exports.UserValidators = UserValidators;
