import React from "react";
import { Button } from "@chakra-ui/react";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import { AppStatus, FirebasePath } from "../../../models/Models";
import { docDelete } from "../../firebase/Firestore";
import { useHistory } from "react-router-dom";
import { useFetchBikes } from "./useFetchBikes";
import {changeStatus} from "../../../redux/slice/AppSlice";

const GearItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid grey;

  button {
    margin-bottom: 0.5rem;
  }

  p {
    text-transform: capitalize;
  }
`;

export const Bikes = () => {
  const { app } = useAppSelector((state) => state);
  const history = useHistory();
  const bikes = useFetchBikes();
  const dispatch = useAppDispatch();

  const redirectToBike = (id: string) => {
    history.push(id);
  };

  const deleteBike = async (id: string) => {
    dispatch(changeStatus(AppStatus.Loading));
    await docDelete(FirebasePath.Bikes, id);
    dispatch(changeStatus(AppStatus.Idle));
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
                <p>{el.km}km</p>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => deleteBike(el.bikeId)}
                >
                  Delete
                </Button>
                <Button
                  size="sm"
                  colorScheme="teal"
                  onClick={() => redirectToBike(el.bikeId)}
                >
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
