import {firebaseAuth} from './InitializeApp';
import {
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    User,
} from 'firebase/auth';

export function firebaseSignOut(): Promise<void> {
    return signOut(firebaseAuth);
}

export function firebaseSignInWithEmailAndPassword(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
}

export function firebaseCreateUserWithEmailAndPassword(email: string, password: string) {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
}

export function firebaseOnUserChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(firebaseAuth, callback);
}
