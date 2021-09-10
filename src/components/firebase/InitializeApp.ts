import {initializeApp} from 'firebase/app';
import {initializeAuth, indexedDBLocalPersistence} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const app = initializeApp({
    apiKey: "AIzaSyA3L9y-BdM8ewKJ-3DYL_bXdoHdKKzmk-M",
    authDomain: "my-gear-d05d1.firebaseapp.com",
    projectId: "my-gear-d05d1",
    storageBucket: "my-gear-d05d1.appspot.com",
    messagingSenderId: "375780385257",
    appId: "1:375780385257:web:203cba153e2910c6ea6b78",
    measurementId: "G-2X0L8LFF6T"
});

export const firebaseAuth = initializeAuth(app, {persistence: [indexedDBLocalPersistence]});
export const firestore = getFirestore(app);