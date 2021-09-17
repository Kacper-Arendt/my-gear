import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import React, { useEffect, useState } from "react";
import { IBike } from "../../../models/Gears";
import { AddComponent } from "./component/AddComponent";
import styled from "styled-components";
import { useFetchBikes } from "./useFetchBikes";
import { deleteBikeComponent } from "../../firebase/Firestore";
import {
  Button,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const BikeDetails = styled.div`
  width: 40rem;
  margin: 2rem 0 0 2rem;

  h1 {
    text-transform: capitalize;
  }
`;
const Components = styled.div`
  width: 50rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 2rem;
  align-items: center;
  gap: 1rem;

  td {
    text-align: center;
  }

  h2 {
    font-weight: lighter;
  }
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
                <Td>Notes</Td>git
                <Td>{item.notes}</Td>
              </Tbody>
            </Table>
          </BikeDetails>
          <Components>
            <Heading as="h2">Components</Heading>
            <AddComponent gearId={id} />
            <Table size="sm">
              <Thead bgColor="teal">
                <Tr>
                  <Th color="white">Name</Th>
                  <Th color="white">Type</Th>
                  <Th color="white">Brand</Th>
                  <Th color="white">Model</Th>
                  <Th color="white">Distance</Th>
                  <Th color="white">Added</Th>
                  <Th color="white">Notes</Th>
                  <Th color="white">Action</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {item.components &&
                  item.components.map((el, key) => {
                    return (
                      <Tr>
                        <Td>{el.name}</Td>
                        <Td>{el.type}</Td>
                        <Td>{el.brand}</Td>
                        <Td>{el.model}</Td>
                        <Td>{el.distance}km</Td>
                        <Td>{el.added}</Td>
                        <Td>{el.notes}</Td>
                        <Td>
                          <Button
                            size="sm"
                            colorScheme="teal"
                            variant="ghost"
                            onClick={() => deleteComponent(el.name)}
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </Components>
        </>
      )}
    </>
  );
};
