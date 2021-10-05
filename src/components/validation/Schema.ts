import * as yup from "yup";

export const LoginSchema = yup.object().shape({
    email: yup.string()
        .email()
        .required('Email is Required'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(32)
        .required('Password is Required'),
});

export const RegisterSchema = yup.object().shape({
    name: yup.string()
        .min(4, 'Name should be at least 4 characters')
        .max(15, '15 characters max')
        .required('Name is required'),
    email: yup.string()
        .email()
        .required('Email is required'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(32)
        .required('Password is Required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'The password and confirmation password do not match.'),
});

export const AddBikeSchema = yup.object().shape({
    name: yup.string()
        .min(3, 'Name should be at least 3 characters')
        .max(15, '15 characters max')
        .required(''),
    brand: yup.string()
        .min(3, 'Brand should be at least 3 characters')
        .max(15, '15 characters max')
        .required(),
    model: yup.string()
        .max(6, '6 characters max')
        .required(),
    weight: yup.number()
        .required(),
    km: yup.number()
        .required(),
});