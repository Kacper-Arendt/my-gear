import {firebaseSignOut} from "./firebase/Auth";

export const HomePage = () => {
    return (
        <>
            <h1>Home Page</h1>
            <button onClick={firebaseSignOut}>Sign Out</button>
        </>
    )
}