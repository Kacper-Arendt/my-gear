import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import React, { useEffect, useState } from "react";
import { IBike } from "../../../models/Gears";
import { AddComponent } from "./component/AddComponent";
import styled from "styled-components";
import { useFetchBikes } from "./useFetchBikes";
import { deleteBikeComponent } from "../../firebase/Firestore";

const StyledComponent = styled.div`
  display: flex;
  gap: 1rem;
`;

export const BikeItem = () => {
  const { bike } = useAppSelector((state) => state);
  const { id }: { id: string } = useParams();
  const [item, setItem] = useState<IBike>();
  useFetchBikes();

  useEffect(() => {
    setItem(bike.find((el) => el.bikeId === id));
  }, [bike]);

  const deleteBike = (name: string) => {
    if (item && name) {
      deleteBikeComponent(item, name);
    }
  };

  return (
    <>
      {item && (
        <>
          <p>Name: {item.name}</p>
          <p>Km: {item.km}</p>
          {item.components &&
            item.components.map((el, key) => {
              return (
                <StyledComponent key={key}>
                  <p>{el.name}</p>
                  <p>{el.type}</p>
                  <p>{el.brand}</p>
                  <p>{el.model}</p>
                  <p>{el.added}</p>
                  <p>{el.distance}</p>
                  <p>{el.notes}</p>
                  <button onClick={() => deleteBike(el.name)}>delete</button>
                </StyledComponent>
              );
            })}
        </>
      )}
      <AddComponent gearId={id} />
    </>
  );
};
