import {firestore} from "./InitializeApp";
import {doc, collection, getDoc, setDoc} from 'firebase/firestore'
import {IUser} from "../../models/User";
import {FirebasePath} from "../../models/Enums";


export function firebaseCollection(path: string) {
    return collection(firestore, path);
}

export const getUserDocument = async (id: string) => {
    try {
        const docRef = doc(firestore, FirebasePath.Users, id)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const response = docSnap.data();
            return response as IUser;
        }
    } catch (error) {
        console.error("Error fetching user", error);
    }
};

export const generateUserDocument = async (id: string, user: IUser): Promise<any> => {
    const {name, email} = user;
    const docRef = doc(firestore, FirebasePath.Users, id)
    const snapshot = await getDoc(docRef);
    try {
        if (!snapshot.exists()) {
            return await setDoc(docRef, {id, name, email});
        } else {
            console.log(`User document already exists`);
        }
    } catch (error) {
        console.log(error);
    }
};