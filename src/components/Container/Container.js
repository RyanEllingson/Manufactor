import React, { useContext } from "react";
import Navbar from "../Navbar";
import Content from "../Content";
import Login from "../Login";
import { FirebaseContext } from "../../firebase/firebase";

const Container = function() {
    const { user } = useContext(FirebaseContext);

    return (
        <>
            <Navbar/>
            <div className="container">
                {user ? <Content/> : <Login/>}
            </div>
        </>
    )
}

export default Container;