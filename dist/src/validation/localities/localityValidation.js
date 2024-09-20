"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.localityIdValidation = exports.localityValidation = void 0;
const express_validator_1 = require("express-validator");
// Validation rules for creating and updating a locality
exports.localityValidation = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('address').notEmpty().withMessage('Address is required'),
    (0, express_validator_1.body)('hub_id').optional().isInt().withMessage('Hub ID must be an integer'),
    (0, express_validator_1.body)('route_id').optional().isInt().withMessage('Route ID must be an integer'),
    (0, express_validator_1.body)('latitude').optional().isString().withMessage('Latitude must be a string'),
    (0, express_validator_1.body)('longitude').optional().isString().withMessage('Longitude must be a string'),
    (0, express_validator_1.body)('active').isIn([0, 1]).withMessage('Active status must be 0 or 1'),
];
// Validation rule for locality ID in request parameters
exports.localityIdValidation = [
    (0, express_validator_1.param)('id').isInt().withMessage('ID must be an integer'),
];
// Middleware to validate the request data against the defined rules
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validate = validate;