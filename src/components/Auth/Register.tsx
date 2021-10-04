import React, {useEffect, useState} from "react";
import {Button, Input, Line, LinkEl, SpinnerCube, Wrapper} from "../UI/UIComponents";
import styled from "styled-components";
import {INewUser} from "../../models/User";
import {generateUserDocument} from "../firebase/Firestore";
import {firebaseCreateUserWithEmailAndPassword, firebaseSignOut} from "../firebase/Auth";
import {useHistory} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const Form = styled.form`
  width: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  p:last-of-type {
    margin-top: 1.5rem;
  }
`;

const schema = yup.object().shape({
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

interface IUseForm {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}


export const Register = () => {
    const [newUser, setNewUser] = useState<INewUser>({
        id: "",
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    });
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const {user} = useAppSelector((state) => state);
    const {register, handleSubmit, formState: {errors}} = useForm<IUseForm>({
        resolver: yupResolver<yup.AnyObjectSchema>(schema)
    });

    const updateField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        });
    };

    const createUserWithEmailAndPasswordHandler = async () => {
        try {
            setLoading(true);
            const createUser = await firebaseCreateUserWithEmailAndPassword(newUser.email, newUser.password);
            if (createUser.user) {
                setNewUser({...newUser, id: createUser.user.uid});
                await generateUserDocument(createUser.user.uid, newUser);
                await firebaseSignOut();
                setMessage("User Created");
            }
        } catch (error) {
            setMessage("Something went wrong");
        }
        setNewUser({
            id: "",
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
        });
        setLoading(false);
    };

    useEffect(() => {
        if (user.isAuth === true) {
            history.push('/')
        }
    }, [user, history]);

    return (
        <Wrapper>
            <h2>Welcome</h2>
            <Line/>
            <Form onSubmit={handleSubmit(createUserWithEmailAndPasswordHandler)}>
                <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={updateField}
                    register={{...register('name')}}
                    required
                />
                <p>{errors.name?.message}</p>
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={updateField}
                    register={{...register('email')}}
                    required
                />
                <p>{errors.email?.message}</p>
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={updateField}
                    register={{...register('password')}}
                    required
                />
                <p>{errors.password?.message}</p>
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={newUser.confirmPassword}
                    onChange={updateField}
                    register={{...register('confirmPassword')}}
                    required
                />
                <p>{errors.confirmPassword?.message}</p>
                <Button type="submit">Submit</Button>
                <p>{message && message}</p>
                {loading && <SpinnerCube/>}
                <p>Already have an account?</p>
                <LinkEl to="/login" value="Click"/>
            </Form>
        </Wrapper>
    );
};
