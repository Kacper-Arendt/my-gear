export interface IUser {
    id: string,
    email: string,
    name: string,
    isAuth?: boolean,
};

export interface INewUser extends IUser {
    password: string,
    confirmPassword: string,
};
