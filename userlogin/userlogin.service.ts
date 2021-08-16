import UserRepo from "./userlogin.repo";
import { ICredential, IUser } from "./userlogin.types";

const createUser = (user: IUser) => UserRepo.createUser(user);

const readAll = () => UserRepo.readAll()

const login = (credential: ICredential) => UserRepo.login(credential);

const isVerfied = (email: string) => UserRepo.isVerfied(email)

export default {
    createUser,
    readAll,
    login,
    isVerfied
}