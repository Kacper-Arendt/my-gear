import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IBike, FirebasePath } from "../../models/Models";
import { getDocument } from "../firebase/Firestore";
import { addGears } from "../../redux/slice/GearSlice";
import { useHistory } from "react-router-dom";

const GearItem = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid black;
`;

export const GetGears = () => {
  const dispatch = useAppDispatch();
  const { user, gear } = useAppSelector((state) => state);
  const [bikes, setBikes] = useState<Array<IBike>>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const getGearsHandler = async () => {
      const request = await getDocument(FirebasePath.Gears, user.id);

      request.forEach((doc) => {
        const { userId, name, km } = doc.data();
        if (!bikes.some((bike) => bike.bikeId === doc.id)) {
          setBikes((bikes) => [
            ...bikes,
            { km: km, name: name, userId: userId, bikeId: doc.id },
          ]);
        }
      });
      setLoading(false);
    };
    getGearsHandler();
  }, []);

  useEffect(() => {
    dispatch(addGears(bikes));
  }, [bikes]);

  const redirectToGearItem = (id: string) => {
    history.push(id);
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {bikes.map((el, key) => {
            return (
              <GearItem key={key}>
                <p>{el.name}</p>
                <p>{el.km}</p>
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
