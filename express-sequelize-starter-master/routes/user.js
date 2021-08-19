const express = require("express")
const router = express.Router()
const db = require("../db/models")
const bcrypt = require('bcryptjs');
const { User } = db
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const { check, validationResult } = require('express-validator')
const login = require("../auth.js")
const { getUserToken } = require("../auth")
const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);
    // If the validation errors are empty,
    if (!validationErrors.isEmpty()) {
        // Generate an array of error messages
        const errors = validationErrors.array().map((error) => error.msg);
        // Generate a new `400 Bad request.` Error object
        // and invoke the next function passing in `err`
        // to pass control to the global error handler.
        const err = Error("Bad request.");
        err.status = 400;
        err.title = "Bad request.";
        err.errors = errors;
        return next(err);
    }
    // Invoke the next middleware function
    next();
};


const validateEmailAndPassword = [
    check("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Please provide a valid email."),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a password."),
    handleValidationErrors,
];

router.post("/register", asyncHandler(async (req, res, next) => {
    console.log("users post route")
    let { username, password, email } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({ username, password: hashedPassword, email })
    const token = getUserToken(user);
    res.status(201).json({
        user: { id: user.id },
        token,
    });
}))

router.post(
    "/token",
    validateEmailAndPassword,
    asyncHandler(async (req, res, next) => {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                email,
            },
        });

        // TODO: Password validation and error handling
    if (!user || !user.validatePassword(password)) {
        const err = new Error("Login failed");
        err.status = 401;
        err.title = "Login failed";
        err.errors = ["The provided credentials were invalid."];
        return next(err);
        }
        // TODO: Token generation
        let token = getUserToken(user)
        res.json({
            token,user:{id:user.id}
        })
    })
);




module.exports = router
