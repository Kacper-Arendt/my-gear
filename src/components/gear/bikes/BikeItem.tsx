import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import React, { useEffect, useState } from "react";
import { IBike } from "../../../models/Gears";
import { AddComponent } from "./component/AddComponent";
import styled from "styled-components";
import { useFetchBikes } from "./useFetchBikes";
import { deleteBikeComponent } from "../../firebase/Firestore";
import { Heading, Table, Tbody, Td } from "@chakra-ui/react";

const BikeDetails = styled.div`
  width: 40rem;
  margin: 2rem 0 0 2rem;
  h1 {
    text-transform: capitalize;
  }
`;

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

  const deleteComponent = (name: string) => {
    if (item && name) {
      deleteBikeComponent(item, name);
    }
  };

  return (
    <>
      {item && (
        <>
          <BikeDetails>
            <Table variant="simple">
              <Heading as="h1">{item.name}</Heading>
              <Tbody>
                <Td>Brand</Td>
                <Td>{item.brand}</Td>
              </Tbody>
              <Tbody>
                <Td>Model</Td>
                <Td>{item.model}</Td>
              </Tbody>
              <Tbody>
                <Td>Distance </Td>
                <Td>{item.km}km</Td>
              </Tbody>
              <Tbody>
                <Td>Weight</Td>
                <Td>{item.weight}kg</Td>
              </Tbody>
              <Tbody>
                <Td>Notes</Td>
                <Td>{item.notes}</Td>
              </Tbody>
            </Table>
          </BikeDetails>
          <div>
            <h3>Components</h3>
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
                    <button onClick={() => deleteComponent(el.name)}>
                      delete
                    </button>
                  </StyledComponent>
                );
              })}
          </div>
        </>
      )}
      <AddComponent gearId={id} />
    </>
  );
};
