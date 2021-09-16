import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { useAppSelector } from "../../../redux/hooks";
import { AppStatus, FirebasePath } from "../../../models/Models";
import { docDelete } from "../../firebase/Firestore";
import { useHistory } from "react-router-dom";
import { useFetchBikes } from "./useFetchBikes";

const GearItem = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid black;
`;

export const Bike = () => {
  const { app } = useAppSelector((state) => state);
  const history = useHistory();
  const bikes = useFetchBikes();

  const redirectToGearItem = (id: string) => {
    history.push(id);
  };

  const deleteBike = async (id: string) => {
    await docDelete(FirebasePath.Bikes, id);
  };

  return (
    <>
      {app.status === AppStatus.Loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {bikes.map((el, key) => {
            return (
              <GearItem key={key}>
                <p>{el.name}</p>
                <p>{el.km}</p>
                <Button onClick={() => deleteBike(el.bikeId)}>Delete</Button>
                <Button onClick={() => redirectToGearItem(el.bikeId)}>
                  See more
                </Button>
              </GearItem>
            );
          })}
        </>
      )}
    </>
  );
};
