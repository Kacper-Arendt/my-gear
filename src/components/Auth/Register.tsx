import React from "react";
import {Button, Input, Wrapper} from "../UI/UIComponents";
import styled from "styled-components";

const Form = styled.form`
  width: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Register = () => {
    return (
        <Wrapper>
            <Form>
                <Input
                    type='text'
                    name='name'
                    placeholder='Name'
                />
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
                <Button>Register</Button>
                <a href="/login">Already have an account?</a>
            </Form>
        </Wrapper>
    )
}