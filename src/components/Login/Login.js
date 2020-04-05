import React, { useContext } from "react";
import { FirebaseContext } from "../../firebase/firebase";
import { PageContext } from "../../page/page";

const Login = function() {
    const { googleSignIn } = useContext(FirebaseContext);
    const { setPage } = useContext(PageContext);

    const handleClick = function(event) {
        event.preventDefault();
        googleSignIn();
        setPage("home");
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="jumbotron text-center">
                    <h1 className="display-4">ManuFactor</h1>
                    <p className="lead">ManuFactor allows manufacturers to define products including sub-operations, create jobs for existing products with due dates, view all the jobs currently in the system, and analyze the actual time each operation has historically taken</p>
                    <hr className="my-4"/>
                    <p>Please log in to get started</p>
                    <button className="btn btn-primary btn-lg" onClick={(e)=>handleClick(e)}>Log in with Google</button>
                </div>
            </div>
        </div>
    )
}

export default Login;