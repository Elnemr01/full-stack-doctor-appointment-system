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

const validationAddDoctorArr = ()=> {
    return [
        body("name").notEmpty().withMessage("Name is required"),
        body("speciality").notEmpty().withMessage("Speciality is required"),
        body("yearsOfExperience").isNumeric().withMessage("Years of experience must be a number"),
        body("description").notEmpty().withMessage("Description is required"),
        body("image").notEmpty().withMessage("Image is required"),
    ]
}

const validationCreateAppointmentArr = ()=> {
    return [
        body("doctorId")
            .notEmpty().withMessage("Doctor ID is required")
            .isMongoId().withMessage("Invalid Doctor ID format"),
        body("reason")
            .notEmpty().withMessage("Reason is required")
            .isString().withMessage("Reason must be a string")
            .isLength({ min: 5, max: 500 }).withMessage("Reason must be between 5 and 500 characters"),
        body("date")
            .notEmpty().withMessage("Date is required")
            .isISO8601().withMessage("Invalid date format (use ISO 8601 format)"),
    ]
}



export {
    validationRegisterArr,
    validationLoginArr,
    validationAddDoctorArr,
    validationCreateAppointmentArr
};
