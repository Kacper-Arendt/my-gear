import { useParams } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
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
import {AppStatus, device} from "../../../models/Models";
import {changeStatus} from "../../../redux/slice/AppSlice";

const Wrapper = styled.div`
  width: 100%;
  max-width: 100rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 0 2rem;
`;

const BikeDetails = styled.div`
  margin: 2rem 0 0 2rem;
  width: 90%;
  max-width: 50rem;

  h1 {
    text-transform: capitalize;
    margin: 1rem 0;
  }
`;

const Detail = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
`;

const Components = styled.div`
  max-width: 60rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  text-align: center;
  text-transform: capitalize;
  h2 {
    font-weight: lighter;
  }

  @media${device.laptop} {
    max-width: 90rem;
  }
`;

const StyledTable = styled(Table)`
  width: 80%;
  margin: auto;

  thead {
    background-color: aquamarine;
  }

  tr {
    margin: 1rem;
  }

  td {
    margin: 0.5rem 0;
  }

  @media${device.mobileM} {
    width: 100%;
    margin: 0;

    td {
      margin: 1rem 0.5rem;
    }
  }
`;

export const BikeItem = () => {
  const dispatch = useAppDispatch();
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
  }, [bike, id]);

  const deleteComponent = async (name: string) => {
    if (item && name) {
      dispatch(changeStatus(AppStatus.Loading));
      await deleteBikeComponent(item, name);
      dispatch(changeStatus(AppStatus.Idle));
    }
  };

  return (
    <Wrapper>
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
              <p>Model</p>
              <p>{item.model}</p>
            </Detail>
            <Line margin=".5rem" />
            <Detail>
              <p>Distance</p>
              <p>{item.km}km</p>
            </Detail>
            <Line margin=".5rem" />

            <Detail>
              <p>Weight</p>
              <p>{item.weight}kg</p>
            </Detail>
            <Line margin=".5rem" />
            <Detail>
              <p>Notes</p>
              <p>{item.notes}</p>
            </Detail>
            <Line margin=".5rem" />
          </BikeDetails>
          <Components>
            <Heading as="h2">Components</Heading>
            <AddComponent bike={item} />
            <StyledTable>
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
            </StyledTable>
          </Components>
        </>
      )}
    </Wrapper>
  );
};
