import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {generateGearDocument} from "../../firebase/Firestore";
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
import {changeStatus} from "../../../redux/slice/AppSlice";
import {AppStatus, IBikeForm, INewBike} from "../../../models/Models";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {AddBikeSchema} from "../../validation/Schema";

const StyledFormControl = styled(FormControl)`
p{
  text-align: center;
}
`

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
    const {register, handleSubmit, formState: {errors}} = useForm<IBikeForm>({
        resolver: yupResolver<yup.AnyObjectSchema>(AddBikeSchema)
    });

    const toggleOpenPopup = () => {
        setOpen(!open);
    };

    const createItemHandler = async () => {
        dispatch(changeStatus(AppStatus.Loading))
        await generateGearDocument(bike);
        dispatch(changeStatus(AppStatus.Idle))
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
                                name="name"
                                type="text"
                                onChange={handleChange}
                                placeholder="Bike Name"
                                register={{...register('name')}}
                                required
                            />
                            <p>{errors.name?.message}</p>
                            <StyledInput
                                name="brand"
                                type="text"
                                onChange={handleChange}
                                placeholder="Brand"
                                register={{...register('brand')}}
                                required
                            />
                            <p>{errors.brand?.message}</p>
                            <StyledInput
                                name="model"
                                type="text"
                                onChange={handleChange}
                                placeholder="Model"
                                register={{...register('model')}}
                                required
                            />
                            <p>{errors.model?.message}</p>
                            <StyledInput
                                name="weight"
                                type="number"
                                onChange={handleChange}
                                placeholder="Weight"
                                register={{...register('weight')}}
                                required
                            />
                            <p>{errors.weight?.message}</p>
                            <StyledInput
                                name="km"
                                type="number"
                                onChange={handleChange}
                                placeholder="Kilometers traveled"
                                register={{...register('km')}}
                                required
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
