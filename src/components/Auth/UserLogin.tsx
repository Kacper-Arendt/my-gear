import React, {useEffect, useState} from "react";
import {Button, Input, Line, LinkEl, SpinnerCube, Wrapper} from '../UI/UIComponents';
import styled from "styled-components";
import {useAppDispatch, login, useAppSelector} from "../../redux/ReduxComponents";
import {firebaseSignInWithEmailAndPassword} from "../firebase/Auth";
import {getUserDocument} from "../firebase/Firestore";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const Form = styled.form`
  width: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  p:last-of-type {
    margin-top: 1.5rem;
  }
`

const schema = yup.object().shape({
    email: yup.string().email().required('Email is Required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').max(32).required('Password is Required'),
});

interface IUseForm {
    email: string,
    password: string,
}

export const UserLogin = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector((state) => state);
    const [formData, setFormData] = useState({email: '', password: ''});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();
    const {register, handleSubmit, formState: {errors}} = useForm<IUseForm>({
        resolver: yupResolver<yup.AnyObjectSchema>(schema)
    });

    const updateField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const signInWithEmailAndPasswordHandler = async (): Promise<void> => {
        try {
            setLoading(true);
            const request = await firebaseSignInWithEmailAndPassword(formData.email, formData.password);
            if (request.user) {
                setFormData({email: '', password: ''});
                const response = await getUserDocument(request.user.uid);
                if (response) {
                    setLoading(false);
                    dispatch(login({id: response.id, email: response.email, name: response.name, isAuth: true}));
                }
            }
        } catch (error) {
            setMessage('Something went wrong');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.isAuth === true) {
            history.push('/');
        }
    }, [user, history]);

    return (
        <Wrapper>
            <h2>Nice to see You</h2>
            <Line/>
            <Form onSubmit={handleSubmit(signInWithEmailAndPasswordHandler)}>
                <Input
                    register={{...register('email')}}
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={updateField}
                    required
                />
                <p>{errors.email?.message}</p>
                <Input
                    register={{...register('password')}}
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={formData.password}
                    onChange={updateField}
                    required
                />
                <p>{errors.password?.message}</p>
                <Button>Login</Button>
                {message && message}
                {loading && <SpinnerCube/>}
                <p>Create an Account?</p>
                <LinkEl to='/register' value='Click'/>
                <LinkEl to='/reset' value='Forgot Your Password?'/>
            </Form>
        </Wrapper>
    )
}