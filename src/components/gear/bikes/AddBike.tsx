import React, {useEffect, useState} from "react";
import styled from "styled-components";
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
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {generateGearDocument} from "../../firebase/Firestore";
import {changeStatus} from "../../../redux/slice/AppSlice";
import {IAppStatus, IBikeForm, INewBike} from "../../../models/Models";
import {BikeSchema} from "../../validation/Schema";

const StyledFormControl = styled(FormControl)`
  p {
    text-align: center;

    ::first-letter {
      text-transform: capitalize;
    }
  }
`;

const StyledButton = styled(Button)`
  height: 2rem;
`;

const StyledInput = styled(Input)`
  margin: 0.5rem;
`;

const StyledTa = styled(Textarea)`
  margin: 0.5rem;
`;

export const AddBike = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector((state) => state);
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
    const {register, handleSubmit, formState: {errors}, clearErrors, reset} = useForm<IBikeForm>({
        mode: 'onBlur',
        resolver: yupResolver<yup.AnyObjectSchema>(BikeSchema)
    });

    useEffect(() => {
        if (errors) {
            setInterval((clearErrors), 8000);
        }
    }, [errors]);

    const toggleOpenPopup = (): void => {
        reset()
        setOpen(!open);
    };

    const createItemHandler = async () => {
        dispatch(changeStatus(IAppStatus.Loading))
        await generateGearDocument(bike);
        dispatch(changeStatus(IAppStatus.Idle))
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
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Add your bike</ModalHeader>
                    <ModalBody pb={6}>
                        <StyledFormControl mt={4}>
                            <StyledInput
                                type="text"
                                placeholder="Bike Name"
                                {...register('name')}
                                required
                                onChange={handleChange}
                            />
                            <p>{errors.name?.message}</p>
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
                                placeholder="Weight"
                                {...register('weight')}
                                required
                                onChange={handleChange}
                            />
                            <p>{errors.weight?.message}</p>
                            <StyledInput
                                type="number"
                                placeholder="Kilometers traveled"
                                {...register('km')}
                                required
                                onChange={handleChange}
                            />
                            <p>{errors.km?.message}</p>
                            <StyledTa
                                name="notes"
                                onChange={handleChange}
                                placeholder="Notes"
                            />
                        </StyledFormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={handleSubmit(createItemHandler)}
                            size="sm"
                            colorScheme="green"
                            type='submit'
                        >
                            Save
                        </Button>
                        <Button
                            size="sm"
                            margin={4}
                            colorScheme="red"
                            onClick={toggleOpenPopup}
                        >
                            Cancel
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
