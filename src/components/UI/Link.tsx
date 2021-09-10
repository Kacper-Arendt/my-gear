import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
    to: string,
    value: string,
}

const StyledLink = styled(Link)`
  margin-top: .5rem;
  font-size: 1.3rem;
  text-decoration: none;
  transition: all .4s;
  color: blue;
`

export const LinkEl = (props: IProps) => {
    return (
        <StyledLink to={props.to}>{props.value}</StyledLink>
    )
}