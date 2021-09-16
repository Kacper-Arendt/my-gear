import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBike } from "../../models/Gears";

const initialState = [] as Array<IBike>;

export const BikeSlice = createSlice({
  name: "bikes",
  initialState,
  reducers: {
    addBikes(state, action: PayloadAction<Array<IBike>>) {
      return action.payload;
    },
  },
});

export const { addBikes } = BikeSlice.actions;
export default BikeSlice.reducer;
