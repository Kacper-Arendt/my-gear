import { useEffect, useState } from "react";
import { getDocument } from "../../firebase/Firestore";
import { IAppStatus, FirebasePath } from "../../../models/Enums";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { IBike } from "../../../models/Gears";
import { changeStatus } from "../../../redux/slice/AppSlice";
import {loadBikes} from "../../../redux/slice/BikeSlice";

export const useFetchBikes = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state);
  const [bikes, setBikes] = useState<Array<IBike>>([]);

  useEffect(() => {
    const getBikesHandler = async () => {
      const request = await getDocument(FirebasePath.Bikes, user.id);
      if (request) {
        request.forEach((doc) => {
          const { userId, name, km, components, model, weight, brand, notes } =
              doc.data();
          if (!bikes.some((bike) => bike.bikeId === doc.id)) {
            setBikes((bikes) => [
              ...bikes,
              {
                km: km,
                name: name,
                userId: userId,
                bikeId: doc.id,
                model: model,
                weight: weight,
                brand: brand,
                notes: notes,
                components: components,
              },
            ]);
          }
        });
      }
      dispatch(changeStatus(IAppStatus.Idle));
    };
    getBikesHandler();
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadBikes(bikes));
  }, [bikes, dispatch]);

  return bikes;
};
