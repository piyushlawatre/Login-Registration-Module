import { NextFunction, Request, Response, Router } from "express";
import { verifyMail } from "./userlogin.mailer";
import userService from "./userlogin.service";
import { ICredential, IUser } from "./userlogin.types";
import { EmailValidation } from "./userlogin.validation";
import jwt from "jsonwebtoken"
import { compare } from "bcrypt";

const router = Router();

router.get('/registration', (req: Request, res: Response, next: NextFunction) => {
    console.log(req.method);
    res.render('registration', { message: req.flash('message') })
})

router.post('/register', EmailValidation, async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as IUser;
    const result = await userService.createUser(user);
    verifyMail(req.body.email);
    res.render('success')
})

router.post('/isverfied', async (req: Request, res: Response, next: NextFunction) => {
    const mail = req.query.email;
    const result = await userService.isVerfied(mail as string);
    res.redirect(307, '/user/login')
})

router.get('/login', async (req: Request, res: Response, next: NextFunction) => {
    res.render('login')
})

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const credential = req.body as ICredential;
    const userDetail = await userService.login(credential);
    if (userDetail != null) {
        const isValidPassword = await compare(credential.password, userDetail.password);
        if (isValidPassword) {
            const token = jwt.sign({ _id: userDetail.id }, process.env.SECRET_TOKEN as string)
            res.header('Auth-Token', token).send(`WELCOME YOU ARE LOGGED IN Token: ${token}`);
        } else {
            res.send(`PASSWORD INCORRECT! PLEASE ENTER VALID PASSWORD`.toUpperCase())
        }
    } else {
        res.send("new ResponseHandler(userDetail, null)");
    }
})

export default router;