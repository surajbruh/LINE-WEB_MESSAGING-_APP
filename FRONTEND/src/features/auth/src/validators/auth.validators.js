import { body } from "express-validator";

export const registerValidation = [
    // username: 3–20 chars, letters/numbers/underscore only
    body("username")
        .trim()
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3, max: 20 }).withMessage("Username must be 3–20 characters")
        .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can contain letters, numbers, and underscores only"),

    // email: valid + normalized
    body("email")
        .trim()
        .isEmail().withMessage("Valid email is required")
        .normalizeEmail(),

    // password: strong (customize to taste)
    // body("password")
    //     .isStrongPassword({
    //         minLength: 8,
    //         // minLowercase: 1,
    //         // minUppercase: 1,
    //         // minNumbers: 1,
    //         // minSymbols: 1
    //     })
    //     .withMessage("Password must be 8+ chars and include upper, lower, number, symbol"),
];

export const loginValidation = [
    body("username")
        .trim()
        .notEmpty().withMessage("Username is required"),

    body("password")
        .notEmpty().withMessage("Password is required")
]
