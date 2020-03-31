import React, { useContext } from "react";
import { FirebaseContext } from "../../firebase/firebase";
import ProductForm from "../ProductForm";

const Home = function() {
    const { user, googleSignIn, signOut } = useContext(FirebaseContext);

    return (
        <div>
            {user ? <h1>Hello {user.displayName}!</h1> : <h1>Welcome, please log in!</h1>}
            {user ? <button onClick = {signOut}>Sign Out</button> : <button onClick = {googleSignIn}>Sign In</button>}
            {user ? <ProductForm/> : ""}
        </div>
    );
}

export default Home;