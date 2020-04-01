import React, { useContext } from "react";
import { PageContext } from "../../page/page";
import { FirebaseContext } from "../../firebase/firebase";
import "./style.css";

const Navbar = function() {
    const { setPage } = useContext(PageContext);
    const { user, signOut } = useContext(FirebaseContext);

    const homeButton = function(event) {
        event.preventDefault();
        setPage("home");
    }

    const signoutButton = function(event) {
        event.preventDefault();
        signOut();
    }

    return (
        <nav className="navbar navbar-dark bg-dark mb-5">
            {user ? <form className="form-inline">
                <button className="btn btn-success" type="button" onClick={(e)=>homeButton(e)}>Home</button>
            </form> : ""}
            {user ? <span className="navbar-text">
                Hello {user.displayName}
            </span> : ""}
            {user ? <form className="form-inline">
                <button className="btn btn-secondary" type="button" onClick={(e)=>signoutButton(e)}>Sign Out</button>
            </form> : ""}
        </nav>
    )
}

export default Navbar;