import React, { useContext } from "react";
import { FirebaseContext } from "../../firebase/firebase";
import Navbar from "../Navbar";
import ProductForm from "../ProductForm";

const Home = function() {
    const { user, googleSignIn } = useContext(FirebaseContext);

    return (
        <div>
            {user ? <Navbar/> : <h1>Welcome, please log in!</h1>}
            {user ? "" : <button onClick = {googleSignIn}>Sign In</button>}
            {user ? <ProductForm/> : ""}
        </div>
    );
}

export default Home;