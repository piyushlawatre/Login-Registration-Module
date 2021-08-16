import { Router } from "express";
import UserRouter from "../userlogin/userlogin.routes";

interface IRouter {
    path: string,
    handler: Router
}

export const routes: IRouter[] = [{
    path: "/user",
    handler: UserRouter
}]