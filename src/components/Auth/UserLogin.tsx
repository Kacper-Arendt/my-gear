import React from "react";
import {Button, Input, Line, LinkEl, Wrapper} from '../UI/UIComponents';
import styled from "styled-components";

const Form = styled.form`
  width: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  p{
    margin-top: 1.5rem;
  };
`


export const UserLogin = () => {
    return (
        <Wrapper>
            <h2>Nice to see You</h2>
            <Line />
            <Form>
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
                <Button>Login</Button>
                <p>Create an Account?</p>
                <LinkEl to='/register' value='Click'/>
            </Form>
        </Wrapper>
    )
}