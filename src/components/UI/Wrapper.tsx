import React from 'react';
import styled from "styled-components";

export const Div = styled.div<IProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: ${(props: IProps) => props.margin ? props.margin : '10vh 0 0'};
`

interface IProps {
    margin?: string
    children: JSX.Element | JSX.Element[]
}

export const Wrapper = (props: IProps) => {
    return (
        <Div margin={props.margin}>
            {props.children}
        </Div>
    )
}