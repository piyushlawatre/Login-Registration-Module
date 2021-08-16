import { Application, json, NextFunction, Request, Response, urlencoded } from "express"
import session from "express-session";
import { routes } from "./routes";
import flush from "connect-flash"
import bodyParser from "body-parser";
export const registerMiddlewares = (app: Application) => {

    app.use(bodyParser.urlencoded({ extended: false }))

    app.use(bodyParser.json());
    
    app.use(session({
        secret: 'secret',
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false
    }))
    app.use(flush())

    for (let route of routes) {
        app.use(route.path, route.handler)
    }

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        return res.status(500).send(err)
    })

}