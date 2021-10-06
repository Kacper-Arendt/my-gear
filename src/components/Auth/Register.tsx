import React, {useEffect, useState} from "react";
import {Button, Input, Line, LinkEl, SpinnerCube, Wrapper, RegisterSchema} from "../Components";
import styled from "styled-components";
import {INewUser, IRegisterForm} from "../../models/Models";
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
    const {register, handleSubmit, formState: {errors}} = useForm<IRegisterForm>({
        mode: 'onBlur',
        resolver: yupResolver<yup.AnyObjectSchema>(RegisterSchema)
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
                    placeholder="Name"
                    value={newUser.name}
                    onChange={updateField}
                    register={{...register('name')}}
                    required
                />
                <p>{errors.name?.message}</p>
                <Input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={updateField}
                    register={{...register('email')}}
                    required
                />
                <p>{errors.email?.message}</p>
                <Input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={updateField}
                    register={{...register('password')}}
                    required
                />
                <p>{errors.password?.message}</p>
                <Input
                    type="password"
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
