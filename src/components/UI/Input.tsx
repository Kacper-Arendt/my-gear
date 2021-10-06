import React from "react";
import styled from "styled-components";

interface InputProps {
    type: string,
    value?: string,
    placeholder: string,
    required?: boolean,
    register?: any
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const StyledInput = styled.input`
  width: 100%;
  max-width: 30rem;
  padding: 1rem 0.5rem ;
  margin: 1rem 0;
  border: .15rem solid black;
  font-size: inherit;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  outline: none;
  transition: all 0.4s;

  ::placeholder {
    color: rgba(0, 0, 0, .7);
  }

  :hover, :focus {
    transform: scale(1.02);
  }

  :focus {
    transform: scale(1.05);
    border: .2rem solid orange;
  }
`;

export const Input = (props: InputProps) => {
    return (
        <StyledInput
            type={props.type}
            value={props.value}
            onBlur={props.onChange}
            placeholder={props.placeholder}
            {...props.register}
            onChange={props.onChange}
        />
    );
}