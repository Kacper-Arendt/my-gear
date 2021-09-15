import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBike } from "../../models/Gears";

const initialState = [] as Array<IBike>;

export const GearSlice = createSlice({
  name: "gears",
  initialState,
  reducers: {
    addGears(state, action: PayloadAction<Array<IBike>>) {
      return action.payload;
    },
  },
});

export const { addGears } = GearSlice.actions;
export default GearSlice.reducer;
