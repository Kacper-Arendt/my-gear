import React, {useEffect, useState} from "react";
import {Button, Input, Line, LinkEl, SpinnerCube, Wrapper} from "../UI/UIComponents";
import styled from "styled-components";
import {INewUser} from "../../models/User";
import {generateUserDocument} from "../firebase/Firestore";
import {firebaseCreateUserWithEmailAndPassword, firebaseSignOut} from "../firebase/Auth";
import {useHistory} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks";

const Form = styled.form`
  width: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-top: 1.5rem;
  }
`;

export const Register = () => {
    const [newUser, setNewUser] = useState<INewUser>({
        id: "",
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    });
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const {user} = useAppSelector((state) => state);

    const updateField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        });
    };

    const createUserWithEmailAndPasswordHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const createUser = await firebaseCreateUserWithEmailAndPassword(newUser.email, newUser.password);
            if (createUser.user) {
                setNewUser({...newUser, id: createUser.user.uid});
                await generateUserDocument(createUser.user.uid, newUser);
                await firebaseSignOut();
                setMessage("User Created");
            }
        } catch (error) {
            setMessage("Something went wrong");
        }
        setNewUser({
            id: "",
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
        });
        setLoading(false);
    };

    useEffect(() => {
        if (user.isAuth === true) {
            history.push('/')
        }
    }, [user, history]);

    return (
        <Wrapper>
            <h2>Welcome</h2>
            <Line/>
            <Form onSubmit={createUserWithEmailAndPasswordHandler}>
                <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={updateField}
                />
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={updateField}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={updateField}
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Repeat Your Password"
                    value={newUser.confirmPassword}
                    onChange={updateField}
                />
                <Button type="submit">Submit</Button>
                <p>{message && message}</p>
                {loading && <SpinnerCube/>}
                <p>Already have an account?</p>
                <LinkEl to="/login" value="Click"/>
            </Form>
        </Wrapper>
    );
};
