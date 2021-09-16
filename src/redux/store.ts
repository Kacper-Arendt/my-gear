import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./slice/UserSlice";
import appReducer from "./slice/AppSlice";
import bikeReducer from "./slice/BikeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    bike: bikeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
