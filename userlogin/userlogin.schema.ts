import { Document, HookNextFunction, model, Schema } from "mongoose";
import  bcrypt  from "bcrypt"
import { IUser } from "./userlogin.types";

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: String, required: false, default: false }
})

type UserDocument = IUser & Document;

/* ----------------------------- Mongoose Hooks ---------------------------- */
/* ---------------------------- Password Hashing ---------------------------- */
userSchema.pre('save', async function save(next: HookNextFunction) {
    const thisObj = this as UserDocument;
    try {
        thisObj.password = await bcrypt.hash(thisObj.password, 10);
        return next()
    }
    catch (e) {
        return next(e)
    }
});
/* ----------------------------------- End ---------------------------------- */

export const UserModel = model<UserDocument>("userDetail", userSchema)