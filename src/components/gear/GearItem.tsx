import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import React, { useEffect, useState } from "react";
import { IBike } from "../../models/Gears";
import { Button } from "@material-ui/core";
import { AddComponent } from "./component/AddComponent";

export const GearItem = () => {
  const dispatch = useAppDispatch();
  const { gear } = useAppSelector((state) => state);
  const { id }: { id: string } = useParams();
  const [item, setItem] = useState<IBike>();

  useEffect(() => {
    setItem(gear.find((el) => el.bikeId === id));
  }, []);

  return (
    <>
      {item && <p>{item.name}</p>}
      <AddComponent />
    </>
  );
};
