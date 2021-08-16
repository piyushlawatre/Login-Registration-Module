import nodemailer from "nodemailer"
import ejs from "ejs"
import * as path from 'path'

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "professor.falsoyo@gmail.com",
        pass: "9890116786"
    }
})

/* --------------------------- Email Verification -------------------------- */

export const verifyMail = (email: string) => ejs.renderFile(path.join(__dirname, '/views/mail.ejs'), { emailid: email }, (err, data) => {

    let mailOptions = {
        from: 'Coditas',
        to: email,
        subject: 'Confirm email address',
        html: data
    }
    transporter.sendMail(mailOptions, (err: any) => {
        if (err) {
            console.log('Error');
        }
    })
})


