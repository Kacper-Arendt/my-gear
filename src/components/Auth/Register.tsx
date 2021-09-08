import React, {useState} from "react";
import {Button, Input, Line, LinkEl, Wrapper} from "../UI/UIComponents";
import styled from "styled-components";
import {INewUser} from "../../models/User";
import {appAuth, generateUserDocument} from "./Firebase";

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

export const Register = () => {
    const [user, setUser] = useState<INewUser>({
        id: '',
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    });
    const [errorMessage, setErrorMessage] = useState<string>('');

    const updateField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const createUserWithEmailAndPasswordHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const createUser = await appAuth.createUserWithEmailAndPassword(user.email, user.password);
            if (createUser.user) {
                const id = createUser.user.uid;
                setUser({
                    ...user,
                    id: id,
                })
                await generateUserDocument(user, id);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setUser({
            id: '',
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
        })
    };

    return (
        <Wrapper>
            <h2>Welcome</h2>
            <Line/>
            <Form onSubmit={createUserWithEmailAndPasswordHandler}>
                <Input
                    type='text'
                    name='name'
                    placeholder='Name'
                    value={user.name}
                    onChange={updateField}
                />
                <Input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={user.email}
                    onChange={updateField}
                />
                <Input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={user.password}
                    onChange={updateField}
                />
                <Input
                    type='password'
                    name='confirmPassword'
                    placeholder='Repeat Your Password'
                    value={user.confirmPassword}
                    onChange={updateField}
                />
                <Button type='submit'>Register</Button>
                <p>Already have an account?</p>
                <LinkEl to='/login' value='Click'/>
            </Form>
        </Wrapper>
    )
}