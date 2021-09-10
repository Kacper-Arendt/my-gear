export interface IUser {
    readonly id: string,
    email: string,
    name: string,
    isAuth?: boolean,
};

export interface INewUser extends IUser {
    readonly password: string,
    readonly confirmPassword: string,
};
