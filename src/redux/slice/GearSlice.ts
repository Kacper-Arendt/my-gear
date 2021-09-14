import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBike } from "../../models/Gears";

const initialState = [] as Array<IBike>;

export const GearSlice = createSlice({
  name: "gear",
  initialState,
  reducers: {
    addGears(state, action) {
      state = action.payload;
    },
  },
});
