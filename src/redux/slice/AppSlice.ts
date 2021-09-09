import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IApp, AppStatus} from "../../models/Models";

const initialState = {status: AppStatus.Idle, message: ''} as IApp;

export const appSlice = createSlice({
    name: 'app,',
    initialState,
    reducers: {
        changeStatus(state, action: PayloadAction<AppStatus>) {
            state.status = action.payload;
        },
        setMessage(state, action: PayloadAction<string>) {
            state.message = action.payload;
        },
    }
})

export const {changeStatus, setMessage} = appSlice.actions;

export default appSlice.reducer;