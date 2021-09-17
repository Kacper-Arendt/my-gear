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
import React, { useState } from "react";
import { updateDocument } from "../../../firebase/Firestore";
import { FirebasePath, IComponent } from "../../../../models/Models";

const initValue = {
  name: "",
  type: "",
  brand: "",
  model: "",
  added: "",
  distance: 0,
};

export const AddComponent = (props: { gearId: string }) => {
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState<IComponent>(initValue);
  const [components, setComponents] = useState<Array<IComponent>>([]);

  const toggleOpenPopup = () => {
    setOpen(!open);
  };

  const handleChange = (e: React.ChangeEvent<any>): void => {
    setComponent({
      ...component,
      [e.target.name]: e.target.value,
    });
  };

  const createItemHandler = async () => {
    setComponents((components) => [...components, component]);
    await updateDocument(FirebasePath.Bikes, props.gearId, {
      components: components,
    });
    setComponent((component) => initValue);
    setOpen(false);
  };

  return (
    <>
      <Button colorScheme="green" size="sm" onClick={toggleOpenPopup}>
        Add Component
      </Button>
      <Modal isOpen={open} onClose={toggleOpenPopup}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add component</ModalHeader>
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <Input
                name="name"
                type="text"
                onChange={handleChange}
                placeholder="Name"
              />
              <Input
                name="type"
                type="text"
                onChange={handleChange}
                placeholder="Type"
              />
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
                name="distance"
                type="number"
                onChange={handleChange}
                placeholder="Distance"
              />{" "}
              <Input
                name="Added"
                type="date"
                onChange={handleChange}
                placeholder="Added"
              />{" "}
              <Textarea
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
            <Button size="sm" colorScheme="green" onClick={createItemHandler}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
