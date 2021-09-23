import { Button, Heading } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import { BikesComponent } from "./Components";
import { firebaseSignOut } from "./firebase/Auth";

const Wrapper = styled.div`
  width: 100%;
  max-width: 60rem;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;
const GearList = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 2rem 1rem;
  font-size: 1.5rem;
  h1 {
    font-size: 2rem;
    width: 100%;
    margin: 1rem 0 2rem;
  }
`;

export const MainPage = () => {
  return (
    <Wrapper>
      <GearList>
        <Heading as="h1">My Gear</Heading>
        <BikesComponent />
      </GearList>
      <Button onClick={firebaseSignOut}>Logout</Button>
    </Wrapper>
  );
};
