import { body } from "express-validator";

const validationRegisterArr = ()=> {
    return [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Invalid email address"),
        body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password should be at least 6 characters')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
    ]
}

const validationLoginArr = ()=> {
    return [
        body("email").isEmail().withMessage("Invalid email address"),
        body('password').notEmpty().withMessage('Password is required'),
    ]
}

export { validationRegisterArr, validationLoginArr };
