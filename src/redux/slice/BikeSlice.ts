import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IBike, IComponent} from "../../models/Gears";

const initialState = [] as Array<IBike>;

export const BikeSlice = createSlice({
  name: "bikes",
  initialState,
  reducers: {
    loadBikes(state, action: PayloadAction<Array<IBike>>) {
      return action.payload;
    },
    addBike(state, action: PayloadAction<IBike>) {
      state = [...state, action.payload]
    },
    updateComponents(state, action: PayloadAction<{bikeId: string, components: Array<IComponent>}>) {
      const bike = state.findIndex(bike => bike.bikeId === action.payload.bikeId);
      state[bike].components = action.payload.components;
    }
  },
});

export const { loadBikes, addBike, updateComponents } = BikeSlice.actions;
export default BikeSlice.reducer;
