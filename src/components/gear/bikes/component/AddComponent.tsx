import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import React, {useState} from "react";
import {updateDocument} from "../../../firebase/Firestore";
import {AppStatus, FirebasePath, IBike, IComponent} from "../../../../models/Models";
import styled from "styled-components";
import {useAppDispatch} from "../../../../redux/hooks";
import {changeStatus} from "../../../../redux/slice/AppSlice";
import {updateComponents} from "../../../../redux/slice/BikeSlice";

const StyledInput = styled(Input)`
  margin: 0.5rem;
`;
const StyledTa = styled(Textarea)`
  margin: 0.5rem;
`;

const initValue = {
  name: "",
  type: "",
  brand: "",
  model: "",
  added: "",
  distance: 0,
};

export const AddComponent = (props: { bike: IBike }) => {
  const [open, setOpen] = useState(false);
  const [isConfirm, setConfirm] = useState(false);
  const [component, setComponent] = useState<IComponent>(initValue);
  const [components, setComponents] = useState<Array<IComponent>>([]);
  const dispatch = useAppDispatch();

  const toggleOpenPopup = () => {
    setOpen(!open);
  };

  const handleChange = (e: React.ChangeEvent<any>): void => {
    setComponent({
      ...component,
      [e.target.name]: e.target.value,
    });
  };

  const saveData = () => {
    if (props.bike.components) {
      setComponents((components) => [
        ...components,
        component,
        ...props.bike.components,
      ]);
    } else {
      setComponents((components) => [...components, component]);
    }
    setConfirm(true);
  };

  const createItemHandler = async () => {
    await updateDocument(FirebasePath.Bikes, props.bike.bikeId, {
      components: components,
    });
    dispatch(updateComponents({bikeId: props.bike.bikeId, components: components}));
    setComponent((component) => initValue);
    setOpen(false);
    setConfirm(false);
  };

  return (
    <>
      <Button colorScheme="green" size="sm" onClick={toggleOpenPopup}>
        Add
      </Button>
      <Modal size="sm" isOpen={open} onClose={toggleOpenPopup}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add component</ModalHeader>
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <StyledInput
                name="name"
                type="text"
                onChange={handleChange}
                placeholder="Name"
              />
              <StyledInput
                name="type"
                type="text"
                onChange={handleChange}
                placeholder="Type"
              />
              <StyledInput
                name="brand"
                type="text"
                onChange={handleChange}
                placeholder="Brand"
              />{" "}
              <StyledInput
                name="model"
                type="text"
                onChange={handleChange}
                placeholder="Model"
              />{" "}
              <StyledInput
                name="distance"
                type="number"
                onChange={handleChange}
                placeholder="Distance"
              />{" "}
              <StyledInput
                name="added"
                type="date"
                onChange={handleChange}
                placeholder="Added"
              />{" "}
              <StyledTa
                name="notes"
                onChange={handleChange}
                placeholder="Notes"
                size="sm"
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
            <Button size="sm" colorScheme="green" onClick={saveData}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal size="sm" isOpen={isConfirm} onClose={toggleOpenPopup}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalBody>
            <p>Name: {component.name}</p>
            <p>Type: {component.type}</p>
            <p>Brand: {component.brand}</p>
            <p>Model: {component.model}</p>
            <p>Distance: {component.distance}</p>
            <p>Added: {component.added}</p>
            <p>Notes: {component.notes}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              margin={4}
              colorScheme="red"
              onClick={() => setConfirm(false)}
            >
              Go back
            </Button>
            <Button size="sm" colorScheme="green" onClick={createItemHandler}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
