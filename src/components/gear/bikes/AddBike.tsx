import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { generateGearDocument } from "../../firebase/Firestore";
import { INewBike } from "../../../models/Gears";

export const AddBike = () => {
  const { user } = useAppSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [bike, setBike] = useState<INewBike>({
    name: "",
    userId: user.id,
    km: 0,
  });

  const toggleOpenPopup = () => {
    setOpen(!open);
  };

  const createItemHandler = async () => {
    await generateGearDocument(bike);
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
      <Button variant="outlined" color="primary" onClick={toggleOpenPopup}>
        Add Bike
      </Button>
      <Dialog open={open} onClose={toggleOpenPopup}>
        <DialogTitle>Add Bike</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Bike Name"
            type="text"
            fullWidth
            autoComplete="off"
            name="name"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="km"
            label="kilometers traveled"
            type="number"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={createItemHandler} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
