import { Button, Heading } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";
import { firebaseSignOut } from "./firebase/Auth";
import { BikesComponent } from "./Components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;
const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;
`;
const GearList = styled.div`
  width: 60%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 2rem 1rem;

  h1 {
    width: 100%;
    margin: 1rem 0 2rem;
  }
`;

export const MainPage = () => {
  const { user } = useAppSelector((state) => state);

  return (
    <Wrapper>
      <GearList>
        <Heading as="h1">My Gear</Heading>
        <BikesComponent />
      </GearList>
      <User>
        <Heading as="h3">Logged as</Heading>
        <p>User: {user.name}</p>
        <p>mail: {user.email}</p>
        <Button colorScheme="teal" size="sm" onClick={firebaseSignOut}>
          Sign Out
        </Button>
      </User>
    </Wrapper>
  );
};
