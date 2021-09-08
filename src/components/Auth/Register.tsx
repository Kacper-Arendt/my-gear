import React from "react";
import {Button, Input, Line, LinkEl, Wrapper} from "../UI/UIComponents";
import styled from "styled-components";

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
    return (
        <Wrapper>
            <h2>Welcome</h2>
            <Line/>
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
                <Input
                    type='password'
                    name='password'
                    placeholder='Repeat Your Password'
                />
                <Button>Register</Button>
                <p>Already have an account?</p>
                <LinkEl to='/login' value='Click'/>
            </Form>
        </Wrapper>
    )
}