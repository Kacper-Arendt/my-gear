import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IApp, IAppStatus} from "../../models/Models";

const initialState = {status: IAppStatus.Loading, message: ''} as IApp;

export const appSlice = createSlice({
    name: 'app,',
    initialState,
    reducers: {
        changeStatus(state, action: PayloadAction<IAppStatus>) {
            state.status = action.payload;
        },
        setMessage(state, action: PayloadAction<string>) {
            state.message = action.payload;
        },
    }
})

export const {changeStatus, setMessage} = appSlice.actions;

export default appSlice.reducer;