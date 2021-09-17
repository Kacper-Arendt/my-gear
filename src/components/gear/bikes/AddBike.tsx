import React, { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { generateGearDocument } from "../../firebase/Firestore";
import { INewBike } from "../../../models/Gears";
import styled from "styled-components";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
  Textarea,
} from "@chakra-ui/react";

const StyledButton = styled(Button)`
  height: 2rem;
`;

export const AddBike = () => {
  const { user } = useAppSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [bike, setBike] = useState<INewBike>({
    name: "",
    userId: user.id,
    km: 0,
    brand: "",
    model: "",
    weight: 0,
    notes: "",
  });

  const toggleOpenPopup = () => {
    setOpen(!open);
  };

  const createItemHandler = async () => {
    await generateGearDocument(bike);
    setOpen(false);
  };
  const handleChange = (e: React.ChangeEvent<any>): void => {
    setBike({
      ...bike,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <StyledButton colorScheme="green" size="sm" onClick={toggleOpenPopup}>
        Add
      </StyledButton>
      <Modal isOpen={open} onClose={toggleOpenPopup}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add your bike</ModalHeader>
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <Input
                name="name"
                type="text"
                onChange={handleChange}
                placeholder="Bike Name"
              />{" "}
              <Input
                name="brand"
                type="text"
                onChange={handleChange}
                placeholder="Brand"
              />{" "}
              <Input
                name="model"
                type="text"
                onChange={handleChange}
                placeholder="Model"
              />{" "}
              <Input
                name="weight"
                type="number"
                onChange={handleChange}
                placeholder="Weight"
              />
              <Input
                name="km"
                type="number"
                onChange={handleChange}
                placeholder="Kilometers traveled"
              />{" "}
              <Textarea
                name="notes"
                onChange={handleChange}
                placeholder="Notes"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              margin={4}
              colorScheme="red"
              onClick={toggleOpenPopup}
            >
              Cancel
            </Button>
            <Button size="sm" colorScheme="green" onClick={createItemHandler}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};