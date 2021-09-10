import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IUser} from "../../models/Models";

const initialState = {id: '', name: '', email: '', isAuth: false} as IUser;

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state: IUser, action: PayloadAction<IUser>) {
            return action.payload;
        },
        logout() {
            return initialState;
        },
        isAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        }
    },
});

export const {login, logout, isAuth} = UserSlice.actions;

export default UserSlice.reducer;