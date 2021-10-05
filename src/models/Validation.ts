export interface ILoginForm {
    email: string,
    password: string,
}
export interface IRegisterForm extends ILoginForm{
    name: string,
    confirmPassword: string,
}

export interface IBikeForm {
    name: string;
    km: number;
    brand: string;
    model: string;
    weight: number;
}