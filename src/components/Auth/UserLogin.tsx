import React, { useState} from "react";
import {Button, Input, Line, LinkEl, Wrapper} from '../UI/UIComponents';
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {appAuth, getUserDocument} from "./Firebase";

const Form = styled.form`
  width: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-top: 1.5rem;
  }
;
`


export const UserLogin = () => {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [error, setError] = useState('');
    const [fetchedUser, setFetchedUser] = useState({
        id: '',
        name: '',
        email: '',
        isAuth: false,
    });
    // const [user, loading, error] = useAuthState(auth)
    const history = useHistory();


    const updateField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const signInWithEmailAndPasswordHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const userLogin = await appAuth.signInWithEmailAndPassword(formData.email, formData.password);
            if (userLogin.user) {
                const userId = userLogin.user.uid;
                const response = await getUserDocument(userId);
                if (response) {
                    setFetchedUser({
                        id: response.id,
                        email: response.email,
                        name: response.name,
                        isAuth: true,
                    })
                    console.log(response)
                }
            }
        } catch
            (error) {
            setError(error.message);
            console.log(error)
        }
        setFormData({
            email: '',
            password: ''
        })
    };


    return (
        <Wrapper>
            <h2>Nice to see You</h2>
            <Line/>
            <Form onSubmit={signInWithEmailAndPasswordHandler}>
                <Input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={updateField}
                />
                <Input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={formData.password}
                    onChange={updateField}
                />
                <Button>Login</Button>
                <p>Create an Account?</p>
                <LinkEl to='/register' value='Click'/>
                <LinkEl to='/reset' value='Forgot Your Password?'/>
            </Form>
        </Wrapper>
    )
}