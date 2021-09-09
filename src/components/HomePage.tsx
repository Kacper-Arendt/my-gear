import {signOut} from "./Auth/Firebase";

export const HomePage = () => {
    return (
        <>
            <h1>Home Page</h1>
            <button onClick={signOut}>Sign Out</button>
        </>
    )
}