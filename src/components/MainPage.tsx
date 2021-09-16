import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";
import { firebaseSignOut } from "./firebase/Auth";
import { AddGear } from "./gear/AddGear";
import { Gears } from "./gear/Gears";

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
  background-color: #f8f8f8;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  h2 {
    width: 40%;
  }

  button {
  }
`;

export const MainPage = () => {
  const { user } = useAppSelector((state) => state);

  return (
    <Wrapper>
      <GearList>
        <h2>My Gear</h2>
        <AddGear />
        <Gears />
      </GearList>
      <User>
        <h3>Logged as</h3>
        <p>User: {user.name}</p>
        <p>mail: {user.email}</p>
        <Button onClick={firebaseSignOut}>Sign Out</Button>
      </User>
    </Wrapper>
  );
};
