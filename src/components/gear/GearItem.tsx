import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import React, { useEffect, useState } from "react";
import { IBike } from "../../models/Gears";
import { AddComponent } from "./component/AddComponent";
import styled from "styled-components";
import { useFetchGear } from "./useFetchGear";

const StyledComponent = styled.div`
  display: flex;
  gap: 1rem;
`;

export const GearItem = () => {
  const { gear } = useAppSelector((state) => state);
  const { id }: { id: string } = useParams();
  const [item, setItem] = useState<IBike>();
  useFetchGear();

  useEffect(() => {
    setItem(gear.find((el) => el.bikeId === id));
  }, [gear]);

  return (
    <>
      {item && (
        <>
          <p>Name: {item.name}</p>
          <p>Km: {item.km}</p>
          {item.components.map((el, key) => {
            return (
              <StyledComponent key={key}>
                <p>{el.name}</p>
                <p>{el.type}</p>
                <p>{el.brand}</p>
                <p>{el.model}</p>
                <p>{el.added}</p>
                <p>{el.distance}</p>
                <p>{el.notes}</p>
              </StyledComponent>
            );
          })}
        </>
      )}
      <AddComponent gearId={id} />
    </>
  );
};
