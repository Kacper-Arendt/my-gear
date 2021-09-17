import { firestore } from "./InitializeApp";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { IUser } from "../../models/User";
import { FirebasePath } from "../../models/Enums";
import { IBike } from "../../models/Gears";

export function firebaseCollection(path: string) {
  return collection(firestore, path);
}

export const getUserDocument = async (id: string) => {
  try {
    const docRef = doc(firestore, FirebasePath.Users, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const response = docSnap.data();
      return response as IUser;
    }
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const generateUserDocument = async (
  id: string,
  user: IUser
): Promise<any> => {
  const { name, email } = user;
  const docRef = doc(firestore, FirebasePath.Users, id);
  const snapshot = await getDoc(docRef);
  try {
    if (!snapshot.exists()) {
      return await setDoc(docRef, { id, name, email });
    } else {
      console.log(`User document already exists`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const generateGearDocument = async (gearData: object): Promise<any> => {
  try {
    return await addDoc(collection(firestore, FirebasePath.Bikes), gearData);
  } catch (error) {
    console.log(error);
  }
};

export const getDocument = async (path: FirebasePath, id: string) => {
  try {
    const docRef = await collection(firestore, path);
    const request = await query(docRef, where("userId", "==", id));
    return getDocs(request);
  } catch (error) {
    console.log(error);
  }
};

export const updateDocument = async (
  path: FirebasePath,
  id: string,
  data: {}
) => {
  try {
    const dbPath = await doc(firestore, path, id);
    return await updateDoc(dbPath, data);
  } catch (error) {
    console.log(error);
  }
};

export const docDelete = async (path: FirebasePath, id: string) => {
  try {
    await deleteDoc(doc(firestore, path, id));
  } catch (e) {
    console.log(e);
  }
};

export const deleteBikeComponent = async (
  bike: IBike,
  deleteGearName: string
) => {
  try {
    const docRef = doc(firestore, FirebasePath.Bikes, bike.bikeId);
    await updateDoc(docRef, {
      components: bike.components.filter(
        (element) => element.name !== deleteGearName
      ),
    });
  } catch (e) {
    console.log(e);
  }
};
