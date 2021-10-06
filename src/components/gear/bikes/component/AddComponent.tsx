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
import {FirebasePath, IBike, IComponent, IComponentForm} from "../../../../models/Models";
import styled from "styled-components";
import {useAppDispatch} from "../../../../redux/hooks";
import {updateComponents} from "../../../../redux/slice/BikeSlice";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {ComponentSchema} from "../../../validation/Schema";

const StyledFormControl = styled(FormControl)`
  p {
    text-align: center;

    ::first-letter {
      text-transform: capitalize;
    }
  }
`;

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
    const {register, handleSubmit, formState: {errors}} = useForm<IComponentForm>({
        resolver: yupResolver<yup.AnyObjectSchema>(ComponentSchema)
    });

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
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Add component</ModalHeader>
                    <ModalBody pb={6}>
                        <StyledFormControl mt={4}>
                            <StyledInput
                                type="text"
                                placeholder="Name"
                                {...register('name')}
                                name="name"
                                required
                                onChange={handleChange}
                            />
                            <p>{errors.name?.message}</p>
                            <StyledInput
                                type="text"
                                placeholder="Type"
                                {...register('type')}
                                required
                                onChange={handleChange}
                            />
                            <p>{errors.type?.message}</p>
                            <StyledInput
                                type="text"
                                placeholder="Brand"
                                {...register('brand')}
                                required
                                onChange={handleChange}
                            />
                            <p>{errors.brand?.message}</p>
                            <StyledInput
                                type="text"
                                placeholder="Model"
                                {...register('model')}
                                required
                                onChange={handleChange}
                            />
                            <p>{errors.model?.message}</p>
                            <StyledInput
                                type="number"
                                placeholder="Distance"
                                {...register('distance')}
                                required
                                onChange={handleChange}
                            />
                            <p>{errors.distance?.message}</p>
                            <StyledInput
                                type="date"
                                placeholder="Added"
                                {...register('added')}
                                required
                                onChange={handleChange}
                            />
                            <p>{errors.added?.message}</p>
                            <StyledTa
                                name="notes"
                                onChange={handleChange}
                                placeholder="Notes"
                                size="sm"
                            />

                        </StyledFormControl>
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
                        <Button onClick={handleSubmit(saveData)} type='submit' size="sm" colorScheme="green">
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal size="sm" isOpen={isConfirm} onClose={toggleOpenPopup}>
                <ModalOverlay/>
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
