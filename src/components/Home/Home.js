import React, { useContext } from "react";
import { FirebaseContext } from "../../firebase/firebase";

const Home = function() {
    const { user, googleSignIn, signOut } = useContext(FirebaseContext);

    return (
        <div>
            {user ? <h1>Hello {user.displayName}!</h1> : <h1>Welcome, please log in!</h1>}
            {user ? <button onClick = {signOut}>Sign Out</button> : <button onClick = {googleSignIn}>Sign In</button>}
        </div>
    )
}

export default Home;