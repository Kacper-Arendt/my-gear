import React from "react";
import { AddBike } from "./AddBike";
import { Bikes } from "./Bikes";
import { Heading } from "@chakra-ui/react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  gap: 2rem 1rem;

  h3 {
    font-weight: lighter;
    font-size: 1.5rem;
  }
`;

export const BikesComponent = () => {
  return (
    <Wrapper>
      <Heading as="h3">Bikes</Heading>
      <AddBike />
      <Bikes />
    </Wrapper>
  );
};
