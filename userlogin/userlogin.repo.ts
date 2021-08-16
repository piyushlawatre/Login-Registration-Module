import { UserModel } from "./userlogin.schema";
import { ICredential, IUser } from "./userlogin.types";

const createUser = (user: IUser) => UserModel.create(user);

const readAll = () => UserModel.find()

const login = (credential: ICredential) => UserModel.findOne({ email: credential.email });

const isVerfied = (email: string) => UserModel.findOneAndUpdate({ email: email }, { isVerified: true }, { new: true })

export default {
    createUser,
    readAll,
    login,
    isVerfied
}