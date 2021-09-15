import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { updateDocument } from "../../firebase/Firestore";
import { FirebasePath } from "../../../models/Enums";
import { useAppSelector } from "../../../redux/hooks";

interface IComponent {
  name: string;
  type: string;
  brand: string;
  model: string;
  added: string;
  distance: number;
  notes?: string;
}

export const AddComponent = () => {
  const { user } = useAppSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState<IComponent>({
    name: "",
    type: "",
    brand: "",
    model: "",
    added: "",
    distance: 0,
  });

  const toggleOpenPopup = () => {
    setOpen(!open);
  };

  const handleChange = (e: React.ChangeEvent<any>): void => {
    setComponent({
      ...component,
      [e.target.name]: e.target.value,
    });
  };

  const createItemHandler = async () => {
    updateDocument(FirebasePath.Gears, user.id, component);
    setOpen(false);
  };
  return (
    <>
      <Button variant="outlined" color="primary" onClick={toggleOpenPopup}>
        Add Component
      </Button>
      <Dialog open={open} onClose={toggleOpenPopup}>
        <DialogTitle>Add Bike</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            type="text"
            autoComplete="off"
            onChange={handleChange}
          />
          <TextField
            name="type"
            label="type"
            type="text"
            onChange={handleChange}
          />
          <TextField
            name="brand"
            label="Brand"
            type="text"
            onChange={handleChange}
          />
          <TextField
            name="model"
            label="Model"
            type="text"
            onChange={handleChange}
          />
          <TextField
            name="distance"
            label="Distance"
            type="number"
            onChange={handleChange}
          />
          <TextField
            label="Added"
            name="added"
            type="date"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="notes"
            label="Notes"
            type="text"
            onChange={handleChange}
            fullWidth
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
