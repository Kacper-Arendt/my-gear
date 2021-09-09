import firebase from "firebase/compat";
import {IUser} from "../../models/User";
import {FirebasePath} from "../../models/Enums";

const firebaseConfig = {
    apiKey: "AIzaSyA3L9y-BdM8ewKJ-3DYL_bXdoHdKKzmk-M",
    authDomain: "my-gear-d05d1.firebaseapp.com",
    projectId: "my-gear-d05d1",
    storageBucket: "my-gear-d05d1.appspot.com",
    messagingSenderId: "375780385257",
    appId: "1:375780385257:web:203cba153e2910c6ea6b78",
    measurementId: "G-2X0L8LFF6T"
};
export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const generateUserDocument = async (user: IUser, id: string) => {
    if (!id) return;
    const userRef = firestore.doc(`users/${id}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const {email, name, } = user;
        try {
            await userRef.set({
                id,
                email,
                name,
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
};

export const getDocuments = async (path: FirebasePath) => {
    try {
        return await firestore.collection(path).get();
    } catch (error) {
        console.error("Error fetching data", error);
    }
};

export const getUserDocument = async (id: string) => {
    try {
        const userDocument = await firestore.doc(`${FirebasePath.Users}/${id}`).get();
        const response = userDocument.data();
        return response as IUser;
    } catch (error) {
        console.error("Error fetching user", error);
    }
};

export const signOut = async () => {
    await auth.signOut();
};