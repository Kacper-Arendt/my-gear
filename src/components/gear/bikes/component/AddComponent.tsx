import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { updateDocument } from "../../../firebase/Firestore";
import { FirebasePath, IComponent } from "../../../../models/Models";

const initValue = {
  name: "",
  type: "",
  brand: "",
  model: "",
  added: "",
  distance: 0,
};

export const AddComponent = (props: { gearId: string }) => {
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState<IComponent>(initValue);
  const [components, setComponents] = useState<Array<IComponent>>([]);

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
    setComponents((components) => [...components, component]);
    await updateDocument(FirebasePath.Bikes, props.gearId, {
      components: components,
    });
    setComponent((component) => initValue);
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
            defaultValue={0}
            onChange={handleChange}
          />
          <TextField
            label="Added"
            name="added"
            type="date"
            defaultValue="2021-11-21"
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
