import styled from "styled-components";
import React from "react";

interface IProps {
    size?: string,
    backgroundColor?: string,
    onClick?: (e: React.SyntheticEvent) => void,
    children: string,
    type?: 'submit' | 'reset'
}

const ButtonEl = styled.button<IProps>`
  width: 100%;
  max-width: 30rem;
  height: 4rem;
  margin: 3rem 0;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 1.3px;
  font-size: ${(props: IProps) => props.size ? props.size : '1.4rem'};
  background-color: ${(props) => props.backgroundColor ? props.backgroundColor : 'var(--color-button-primary)'};
  transition: .3s all;

  :hover {
    background-color: var(--color-button-secondary);
  }
`

export const Button = (props: IProps) => {
    return (
        <ButtonEl
            type={props.type}
            size={props.size}
            onClick={props.onClick}
            backgroundColor={props.backgroundColor}
        >
            {props.children}
        </ButtonEl>)
}