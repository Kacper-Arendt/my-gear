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

export const BikeSchema = yup.object().shape({
    name: yup.string()
        .min(3)
        .max(15)
        .required(),
    brand: yup.string()
        .min(3)
        .max(15)
        .required(),
    model: yup.string()
        .max(6)
        .required(),
    weight: yup.number()
        .typeError('Weight is required')
        .required(),
    km: yup.number()
        .typeError('Kilometers Traveled is required')
        .required(),
});

export const ComponentSchema = yup.object().shape({
    name: yup.string()
        .min(3)
        .max(15)
        .required(),
    type: yup.string()
        .min(3)
        .max(15)
        .required(),
    brand: yup.string()
        .min(3)
        .max(12)
        .required(),
    model: yup.string()
        .required(),
    distance: yup.number()
        .typeError('Distance is required')
        .required(),
    added: yup.date()
        .typeError('Date is required')
        .required(),
});