import express from "express";
import { registerMiddlewares } from "./register-middleware";
import { connectMongoDB } from "../dbconnection/mongo-connection";
import expressLayouts from "express-ejs-layouts"
import * as path from 'path'

export const startServer = async () => {
    try {
        const app = express();

        await connectMongoDB();

        registerMiddlewares(app);

        app.use(expressLayouts);
        app.set('views', path.join(__dirname, '../views'))
        app.set('layout', './layouts/full-width')
        app.set('view engine', 'ejs')

        app.listen((process.env.PORT), () => {
            console.log(`----------------------- Server Started At Port ${process.env.PORT} ----------------------`)
        })
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}