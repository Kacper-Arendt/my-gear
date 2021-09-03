import React from "react";
import {Input} from '../UI/UIComponents';

export const UserLogin = () => {
    return (
        <>
            <form>
                <Input
                    type='email'
                    name='email'
                    placeholder='Email'
                />
                <Input
                    type='password'
                    name='password'
                    placeholder='Password'
                />
                <button>Login</button>
                <a href="/register">Create an account</a>
            </form>
        </>
    )
}