import { body, CustomValidator } from "express-validator"
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { UserModel } from "./userlogin.schema";

/* --------------- Custom Validator For If Email Is Registered -------------- */

const roleValidation: CustomValidator = email => {
    return UserModel.exists({ email: email }).then(exist => {
        if (exist) {
            return Promise.reject('Email Already Exist');
        }
    });
};

/* ------------------------------ Error Handler ----------------------------- */

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = "Email already registered"
        req.flash('message', message);
        res.redirect('/user/registration')
    }
    next();
}

/* ----------------------------- Email validator ---------------------------- */

export const EmailValidation = [
    body("email").custom(roleValidation),
    validate
]


