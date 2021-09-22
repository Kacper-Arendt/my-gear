import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import React, { useEffect, useState } from "react";
import { IBike } from "../../../models/Gears";
import { AddComponent } from "./component/AddComponent";
import styled from "styled-components";
import { useFetchBikes } from "./useFetchBikes";
import { deleteBikeComponent } from "../../firebase/Firestore";
import { Button, Heading } from "@chakra-ui/react";
import { Line } from "../../UI/Line";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const BikeDetails = styled.div`
  margin: 2rem 0 0 2rem;

  h1 {
    text-transform: capitalize;
    margin: 1rem 0;
  }
`;

const Detail = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
`;

const Components = styled.div`
  width: 70%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  text-align: center;
  text-transform: capitalize;

  tbody {
    border: none;
  }

  h2 {
    font-weight: lighter;
  }
`;

export const BikeItem = () => {
  const { bike } = useAppSelector((state) => state);
  const { id }: { id: string } = useParams();
  const [item, setItem] = useState<IBike>();
  const columns = [
    "Name",
    "Type",
    "Brand",
    "Model",
    "Distance",
    "Added",
    "Notes",
    "Action",
  ];
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
            <Heading as="h1">{item.name}</Heading>
            <Detail>
              <p>Brand</p>
              <p>{item.brand}</p>
            </Detail>
            <Line margin=".5rem" />
            <Detail>
              <p>Brand</p>
              <p>{item.model}</p>
            </Detail>
            <Line margin=".5rem" />
            <Detail>
              <p>Brand</p>
              <p>{item.km}</p>
            </Detail>
            <Line margin=".5rem" />

            <Detail>
              <p>Brand</p>
              <p>{item.weight}</p>
            </Detail>
            <Line margin=".5rem" />
            <Detail>
              <p>Brand</p>
              <p>{item.notes}</p>
            </Detail>
            <Line margin=".5rem" />
          </BikeDetails>
          <Components>
            <Heading as="h2">Components</Heading>
            <AddComponent bike={item} />
            <Table>
              <Thead>
                <Tr>
                  {columns.map((column, key) => {
                    return <Th key={key}>{column}</Th>;
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {item.components &&
                  item.components.map((el, key) => {
                    return (
                      <Tr key={key}>
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
