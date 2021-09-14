import { useAppSelector } from "../../redux/hooks";
import React, { useEffect, useState } from "react";
import { IFetchedBike } from "../../models/Gears";
import { getDocument } from "../firebase/Firestore";
import { FirebasePath } from "../../models/Enums";
import { getDocs } from "firebase/firestore";
import { Button } from "@material-ui/core";
import styled from "styled-components";

const GearItem = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid black;
`;

export const GetGears = () => {
  const { user } = useAppSelector((state) => state);
  const [bikes, setBikes] = useState<Array<IFetchedBike>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGearsHandler = async () => {
      const request = await getDocument(FirebasePath.Gears, user.id);
      const querySnapshot = await getDocs(request);

      querySnapshot.forEach((doc) => {
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
                <Button>See more</Button>
              </GearItem>
            );
          })}
        </>
      )}
    </>
  );
};
