import { useEffect, useState } from "react";
import { getDocument } from "../firebase/Firestore";
import { AppStatus, FirebasePath } from "../../models/Enums";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IBike } from "../../models/Gears";
import { addGears } from "../../redux/slice/GearSlice";
import { changeStatus } from "../../redux/slice/AppSlice";

export const useFetchGear = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state);
  const [bikes, setBikes] = useState<Array<IBike>>([]);

  useEffect(() => {
    const getGearsHandler = async () => {
      const request = await getDocument(FirebasePath.Gears, user.id);
      if (request) {
        request.forEach((doc) => {
          const { userId, name, km, components } = doc.data();
          if (!bikes.some((bike) => bike.bikeId === doc.id)) {
            setBikes((bikes) => [
              ...bikes,
              {
                km: km,
                name: name,
                userId: userId,
                bikeId: doc.id,
                components: components,
              },
            ]);
          }
        });
      }
    };
    getGearsHandler();
  }, []);

  useEffect(() => {
    dispatch(addGears(bikes));
    dispatch(changeStatus(AppStatus.Idle));
  }, [bikes]);

  return bikes;
};
