import React from "react";
import { AddBike } from "./AddBike";
import { Bikes } from "./Bikes";
import { Heading } from "@chakra-ui/react";

export const BikesComponent = () => {
  return (
    <>
      <Heading as="h3">My Bikes</Heading>
      <AddBike />
      <Bikes />
    </>
  );
};
