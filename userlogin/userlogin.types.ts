export interface IUser {
    _id?: any
    email: string,
    password: string
    isVerified:boolean
}

export interface ICredential {
    email: string;
    password: string
}